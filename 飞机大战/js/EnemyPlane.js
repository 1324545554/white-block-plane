'use strict';
(function(){
	var EnemyPlane = window.EnemyPlane = function(){
		this.images = ['dj1','dj6','dj10'];
		this.random = null;
		for(var i=0;i<100;i++){
			var num = parseInt(Math.random()*100);//伪随机数
			if(num<=80){
				this.random = 2;
			}else if(num<90&&num>80){
				this.random = 1;
			}else{
				this.random = 0;
			}
		}

		this.image = game.R[this.images[this.random]];

		this.x = null;
		if(this.random == 0){
			this.x = parseInt(Math.random()*(game.canvas.width - 140) + 10);
		}else if(this.random == 1){
			this.x = parseInt(Math.random()*(game.canvas.width - 122) + 10);
		}else{
			this.x = parseInt(Math.random()*(game.canvas.width - 68) + 10);
		}

		this.y = -200;

		this.HP = (3-this.random)*20;//血量
		this.isdie = false;
		

	}
	EnemyPlane.prototype.render = function(){

		game.ctx.drawImage(this.image, this.x, this.y);
		
	}
	EnemyPlane.prototype.update = function(){
		if(this.HP<0){
			this.HP = 0;
			this.isdie = true;
			// 死亡计分
			game.score+=(this.random+1)*100;
		}
		this.y += game.background.speed*5;
		if(this.y>game.canvas.height || this.isdie){
			for(var i=0;i<game.enemyplaneArr.length;i++){
				if(game.enemyplaneArr[i]===this){
					game.enemyplaneArr.splice(i,1);
				}
				
			}
		}

        //敌机矩形盒子 
		this.directionArr = [[130,98],[112,85],[75,54]];//图片宽高数组
		this.T = this.y - 30;
		this.R = this.x + this.directionArr[this.random][0];
		this.B = this.y + this.directionArr[this.random][1] - 30;
		this.L = this.x;
		
		
		// 判断是否撞到我的飞机
		if(this.R>game.myplane.my_L&&this.B>game.myplane.my_T&&this.L<game.myplane.my_R&&this.T<game.myplane.my_B){
			this.isdie = true;
			game.bombArr.push(new Bomb(game.myplane.my_L,game.myplane.my_T,game.myplane.width,game.myplane.height));
			game.myplane.isdie = true;
			document.getElementById('bz').play();
		}

		// 添加爆炸动画和音效
		if(this.isdie&&!game.myplane.isdie){
			game.bombArr.push(new Bomb(this.x,this.y,this.directionArr[this.random][0],this.directionArr[this.random][1]));
			document.getElementById('bz').play();
		}
		
	}
	
})();