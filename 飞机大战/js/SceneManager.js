'use strict';
(function(){
	var SceneManager = window.SceneManager = function(){
			this.bindEvent();
	}
	SceneManager.prototype.gotoScene = function(number){
		game.scene = number;
		switch(game.scene){
			case 0:
				game.background = new Background();
				game.myplane = new MyPlane();
				game.myplane.y = game.canvas.height;
				game.frame = 0;
				this.myplaneDirection = 'up';//我的飞机运动方向
				this.fps = 0;//自己的倒计时
				this.daojishi = 3; //进入下一个场景倒计时
				game.score = 0;
				document.getElementById('gover').pause();
				document.getElementById('bgm').load();
				document.getElementById('bgm').play();
				break;
			case 1:
				game.background = new Background();
				game.myplane = new MyPlane();
				game.bulletArr = [];
				game.enemyplaneArr = [];
				game.bombArr = [];
				break;

			case 2:
				game.background = new Background();
				game.myplane = new MyPlane();
				game.myplane.y = game.canvas.height*0.5 + 80;
				this.score = 0;//分数累加至游戏分数，默认为零
				game.bulletArr = [];
				document.getElementById('bgm').pause();
				document.getElementById('bz').pause();
				document.getElementById('gover').play();
				break;
		}
	}
	SceneManager.prototype.updateAndRender = function(){
		switch(game.scene){
			case 0:
				game.frame%2 == 0 && game.background.update();
				game.background.render();
				game.myplane.render();
				if(this.myplaneDirection == 'up'){
					game.myplane.y-=10;
					if(game.myplane.y<game.canvas.height*0.618){
						game.myplane.y = game.canvas.height*0.618;
						this.myplaneDirection = 'down';
					}
				}else{
					game.frame%2 == 0 && game.myplane.y ++;
					if(game.myplane.y>(game.canvas.height - 130)){
						game.myplane.y = game.canvas.height - 130;

					}
					if(game.myplane.y == game.canvas.height - 130){//飞机到位置之后再倒计时
						this.fps ++;
						this.fps%50 == 0 && this.daojishi --;
						if(this.daojishi<1){
							this.daojishi = 1;
							game.sm.gotoScene(1);
						}
						game.ctx.drawImage(game.R[this.daojishi.toString()], game.canvas.width/2 - 32,game.canvas.height/2 - 43);

					}

				}

				break;
			case 1:
				game.background.update();
		       	game.background.render();
		       	// 判断我的飞机是否死亡
				if(!game.myplane.isdie){
					game.myplane.update();
		        	game.myplane.render();
				}else{
					// 死亡
					setTimeout(function(){
						game.sm.gotoScene(2);
					}, 1000);

				}

				if(!game.myplane.isdie){game.frame%5 == 0 && game.bulletArr.push(new Bullet(game.myplane.x,game.myplane.y));}
				for(var i=game.bulletArr.length-1; i>=0;i--){
					game.bulletArr[i].render();
					game.bulletArr[i].update();
				}

				if(game.score<5000){
					game.frame%30 == 0 && game.enemyplaneArr.push(new EnemyPlane());
				}else{
					game.frame%20 == 0 && game.enemyplaneArr.push(new EnemyPlane());
				}

				for(var i=game.enemyplaneArr.length-1; i>=0;i--){
					game.enemyplaneArr[i].render();
					game.enemyplaneArr[i].update();
				}
				for(var i=game.bombArr.length-1; i>=0;i--){
					if(!game.bombArr[i].godie){
						game.bombArr[i].update();
						game.bombArr[i].render();
					}else{
						game.bombArr.splice(i,1);
					}
				}

				//分数渲染
				var scoreString = game.score.toString();
				var scoreLength = scoreString.length;
				for(var i=0;i<scoreLength;i++){
					var char = scoreString.charAt(i);
					// 渲染每个分值，右侧显示每一个字符的宽度是64
					game.ctx.drawImage(game.R[char],game.canvas.width-26*(scoreLength - i) - 10,10,26,36);

				}
				break;
			case 2:
		       	game.background.render();
		       	game.myplane.render();
				game.ctx.drawImage(game.R['logo'],game.canvas.width/2 - game.canvas.width*0.4,game.canvas.height/4,game.canvas.width*0.8,178/573*game.canvas.width*0.8)
				game.ctx.drawImage(game.R['again1'],game.canvas.width/2 - game.canvas.width/6,game.canvas.height*0.5 + 200,game.canvas.width/3,155/494*game.canvas.width/3)
				//分数渲染
				var scoreString = this.score.toString();
				var scoreLength = scoreString.length;
				for(var i=0;i<scoreLength;i++){
					var char = scoreString.charAt(i);
					// 渲染每个分值，右侧显示每一个字符的宽度是64
					game.ctx.drawImage(game.R[char],(game.canvas.width - scoreLength*26)/2+26*i,game.canvas.height*0.5 + 30,26,36);

				}
				this.score +=100;
				if(this.score>game.score){
					this.score = game.score;
				}

				break;
		}
	}
	SceneManager.prototype.bindEvent = function(){
		var self = this;
		var lock = true;

		game.canvas.addEventListener('mousemove', function(event) {
			var x = event.offsetX;
			var y = event.offsetY;
			handler(x,y);
		});
		game.canvas.addEventListener('mousedown', function(event) {
			var x = event.offsetX;
			var y = event.offsetY;
			if(game.scene == 2){
				if(x>(game.canvas.width - game.canvas.width/3)/2 && x<(game.canvas.width - game.canvas.width/3)/2 + game.canvas.width/3 && y>game.canvas.height - 100 && y<game.canvas.height - 100 + 155/494*game.canvas.width/3){
					game.sm.gotoScene(0);
				}
			}
		});
		function handler(x,y){
			switch(game.scene){
				case 0:
					break;
				case 1:
					game.myplane.x = x;
					game.myplane.y = y;
					if(game.myplane.x>game.canvas.width - game.myplane.width - 10){
						game.myplane.x = game.canvas.width - game.myplane.width - 10;
					}
					if(game.myplane.x<10){
						game.myplane.x = 10;
					}
					if(game.myplane.y>game.canvas.height - game.myplane.height - 10){
						game.myplane.y = game.canvas.height - game.myplane.height -10;
					}
					if(game.myplane.y<10){
						game.myplane.y = 10;
					}
					break;
				case 2:

					break;
			}
		}
	}
})()