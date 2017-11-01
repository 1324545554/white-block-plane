(function(){
	var MyPlane = window.MyPlane = function(){
		this.image = game.R['myplane1'];
		this.width = 120;
		this.height = 79;
		this.x = game.canvas.width/2 - this.width/2;
		this.y = game.canvas.height - 130;
		this.isdie = false;

	}
	MyPlane.prototype.render = function(){
		game.ctx.drawImage(this.image, this.x, this.y);
	}
	MyPlane.prototype.update = function(){
		// 所占矩形块位置
		this.my_T = this.y;
		this.my_R = this.x + this.width;
		this.my_B = this.y + this.height;
		this.my_L = this.x;
	}
})();