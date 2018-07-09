// 创建构造函数
function Game(){
    this.oC = document.querySelector("#c1");
    this.oDiv = document.querySelector("#div1");
    this.oScore = document.querySelector(".score");

    this.onresize();
    this.oBtn = document.querySelector("#btn1");

    this.gd =this.oC.getContext('2d');
    this.Width = this.oC.width;
    this.Height = this.oC.height;
    this.R = 4;
    this.C = 4;
    this.block_w = this.Width/this.C;
    this.block_h=this.Height/this.R;

    this.Top = -this.block_h;

    this.speed =1;
    this.timer = null;
    this.Data = null;
    this.score =0;

    this.init();
    this.draw();
    this.bindEvent();
}
// 屏幕自适应
Game.prototype.onresize = function(){
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    this.oC.width = w;
    this.oC.style.width = w +'px';
    this.oC.height = h;
    this.oC.style.height =h +'px';

    this.oDiv.style.width = w +'px';
    this.oDiv.style.height = h +'px';
}
// 初始化游戏
Game.prototype.init = function(){
    // console.log(222)
    this.speed = 1;
    this.Top = - this.block_h;
    this.Data = [];
    for(var i = 0;i< this.R+1;i++){
        this.Data.push(this.createLine());
    }
    this.start();
    this.draw();
}

// 创建行
Game.prototype.createLine = function(){
    // console.log(333)
    var tmp = [];
    for(var i = 0;i<this.C;i++){
        tmp[i]=0;
    }
    tmp[Math.floor(Math.random()*this.C)]=1;
    return tmp;
}

// 绘制方块
Game.prototype.draw = function(){

      this.gd.clearRect(0,0,this.Width,this.Height);
// data.lengyh指的是创建的行里的东西
        for(var r = 0;r<this.Data.length;r++){

            for(var c = 0;c<this.Data[r].length;c++){
                if(this.Data[r][c] == 0){

                    this.gd.fillStyle ="#fff";
                }else{
                    this.gd.fillStyle = "#000";
                }
                this.gd.fillRect(c*this.block_w,this.Top + r*this.block_h,this.block_w,this.block_h);

                this.gd.strokeStyle = '#999';
                     // console.log(this.Data[r][c]);
                this.gd.strokeRect(c*this.block_w,this.Top+r*this.block_h,this.block_w,this.block_h);
            }
        }
}

//添加定时器
 Game.prototype.start= function(){
    var self = this;
    this.timer =setInterval(function(){
        self.Top +=self.speed;
        if(self.Top>=0){
            var row =self.Data.pop();
            self.Data.unshift(self.createLine());

            self.Top =-self.block_h;
            if(row.includes(1)){
                clearInterval(self.timer);
                alert('game over');
                self.oDiv.style.display = 'block';
            }
        }
        self.draw();
    },16);
}

// 事件监听
Game.prototype.bindEvent = function(){
    var self = this;
    // var score =0;
    this.oC.onclick = function(event){
        var x =event.offsetX;
        var y = event.offsetY - self.Top;

        var r = Math.floor(y/self.block_h);
        var c = Math.floor(x/self.block_w);

        if(self.Data[r][c] == 0 ){
            clearInterval(self.timer);
            alert('game over');
            self.oDiv.style.display = 'block';

        }else{
            self.score += 1;
            self.oScore.innerHTML ="当前得分为：" + self.score;
            console.log(self);
            self.Data[r][c]=0;
            self.speed+=0.3;
        }
        self.draw();
    }
    this.oBtn.onclick = function(){
        self.init();
        self.oDiv.style.display = 'none';
    }
}