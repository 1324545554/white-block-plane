'use strict';
(function(){
	var Game = window.Game = function(){
		this.canvas = document.getElementById('canvas');
		this.canvas.width = document.documentElement.clientWidth;
		this.canvas.height = document.documentElement.clientHeight;
		if(this.canvas.width<600){
			this.canvas.width = 1300;
		}
		if(this.canvas.height>800){
			this.canvas.height = 800;
		}
		this.ctx = this.canvas.getContext('2d');
		this.score = 0;
		this.scene = 0;
		this.LoadResource(function(){this.start()});
	}
	Game.prototype.LoadResource = function(callback){
		document.getElementById('bz').load();
		document.getElementById('zd').load();
		document.getElementById('gover').load();
		this.R = {
			"myplane1" :  "images/myplane1.png",
			"logo" :  "images/logo.png",
			"again1" :  "images/again1.png",
			"dj10"     :  "images/dj10.png",
			"dj6"      :  "images/dj6.png",
			"dj1"      :  "images/dj1.png",
			"bullet1"  :  "images/bullet1.png",
			"bg_01"    :  "images/bg_01.jpg",
			"bg_02"    :  "images/bg_02.jpg",
			"bg_03"    :  "images/bg_03.jpg",
			"bg_04"    :  "images/bg_04.jpg",
			"img_HP"   :  "images/img_HP.png",
			"b1"       :  "images/b1.gif",
			"b2"       :  "images/b2.gif",
			"b3"       :  "images/b3.gif",
			"b4"       :  "images/b4.gif",
			"b5"       :  "images/b5.gif",
			"b6"       :  "images/b6.gif",
			"b7"       :  "images/b7.gif",
			"b8"       :  "images/b8.gif",
			"b9"       :  "images/b9.gif",
			"b10"      :  "images/b10.gif",
			"b11"      :  "images/b11.gif",
			"0"        :  "images/0.png",
			"1"        :  "images/1.png",
			"2"        :  "images/2.png",
			"3"        :  "images/3.png",
			"4"        :  "images/4.png",
			"5"        :  "images/5.png",
			"6"        :  "images/6.png",
			"7"        :  "images/7.png",
			"8"        :  "images/8.png",
			"9"        :  "images/9.png"
		}
		var count = 0;
		var length = Object.keys(this.R).length;
		var self = this;
		for(var k in this.R){
			(function(k){
				var img = new Image();
				img.src = self.R[k];
				img.onload = function(){
					count ++;
					self.R[k] = this;
					self.clear();
					self.ctx.fillStyle = "#333";
					self.ctx.textAlign = 'center';
					self.ctx.fillText("正在加载资源"+parseInt(count/length)*100+"%", self.canvas.width/2, self.canvas.height/2);
					if(count==length){
						callback.call(self);
					}
				}
			})(k)
		}

	};
	Game.prototype.clear = function(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}


	Game.prototype.start = function(){
		this.frame = 0;
		this.sm = new SceneManager();
		this.sm.gotoScene(this.scene);
		this.timer = setInterval(this.loop.bind(this),20);
	}
	Game.prototype.loop = function(){
		this.clear();
		//帧编号加1
        this.frame++;
		//场景管理器更新并渲染
        this.sm.updateAndRender();
		// // 帧数渲染
  //       this.ctx.fillStyle = '#FFB70D';
  //       this.ctx.font = "20px songTi";
  //       this.ctx.textBaseLine = "top";
		// this.ctx.textAlign = 'left';
  //       this.ctx.fillText("帧："+this.frame,10,20);
	}
})()