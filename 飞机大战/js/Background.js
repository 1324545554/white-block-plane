'use strict';
(function(){
	var Background = window.Background = function(){
		this.images = ["bg_01","bg_02","bg_03","bg_04"];
		this.random = parseInt(Math.random()*(this.images.length));
		this.image = game.R[this.images[this.random]];
		this.width = game.canvas.width;
		this.height = this.width*768/512;
		this.speed = 1;
		this.y = 0

	}
	Background.prototype.render = function(){
		game.ctx.drawImage(this.image, 0, this.y + this.height,this.width,this.height);
		game.ctx.drawImage(this.image, 0, this.y,this.width,this.height);
		game.ctx.drawImage(this.image, 0, this.y-this.height,this.width,this.height);
		game.ctx.drawImage(this.image, 0, this.y-this.height*2,this.width,this.height);

	}
	Background.prototype.update = function(){
		this.y+=this.speed;
		if(this.y>this.height) this.y = 0;
	}

})();