'use strict';
(function(){
	var Bullet = window.Bullet = function(x,y){
		this.image = game.R['bullet1'];
		this.height = 38;
		this.width = 20;
		this.x = x+30;
		this.y = y-25;

		this.reduceHP = 5;//消耗血量值
		this.isdie = false;
	}
	Bullet.prototype.render = function(){
		game.ctx.drawImage(this.image, this.x, this.y);
		game.ctx.drawImage(this.image, this.x+40, this.y);
	}
	Bullet.prototype.update = function(){
		this.y-=game.background.speed*15;
		if(this.y<-this.height || this.isdie){
			for(var i=0;i<game.bulletArr.length;i++){
				if(game.bulletArr[i]==this){
					game.bulletArr.splice(i,1);
				}
				
			}
		}
		
		// 判断子弹是否打到飞机
		this.b_T = this.y;
		this.b_R = this.x + this.width;
		this.b_B = this.y + this.height;
		this.b_L = this.x;

		var self = this;

		game.enemyplaneArr.forEach(function(item,index){
			if(self.b_T<item.B&&self.b_B>item.T&&self.b_R>item.L&&self.b_L<item.R || self.b_T<item.B&&self.b_B>item.T&&(self.b_R+40)>item.L&&(self.b_L+40)<item.R){
				self.isdie = true;//打到飞机，自己死去
				// document.getElementById('zd').load();
				document.getElementById('zd').play();
				game.enemyplaneArr[index].HP -= self.reduceHP;//被打到的飞机减血量
			}
		});
	}
	
})();