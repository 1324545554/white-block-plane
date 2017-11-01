'use strict';
(function(){
	var Bomb = window.Bomb = function(x,y,w,h){
		this.imgArr = ["b1","b2","b3","b4","b5","b6","b7","b8","b9","b10","b11"];
		this.width = w;
		this.height = h;
		this.x = x;
		this.y = y;
		this.fps = 0;
		this.godie = false;
	};

	Bomb.prototype.render = function(){
		if(!this.godie){
			game.ctx.drawImage(game.R[this.imgArr[this.fps]], this.x, this.y, this.width,this.height);
		}
		
	};

	Bomb.prototype.update = function(){
		this.fps++;
		if(this.fps == this.imgArr.length - 1){
			this.godie = true;
		}
	};

})();