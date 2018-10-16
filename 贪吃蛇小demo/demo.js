//点击开始游戏--》startPage消失  --》游戏开始 
// 随机出现食物，出现三节蛇开始运动
//上下左右--》改变方向运动
//吃到食物--》 蛇的长度加一
//吃到自己或者撞到墙 ，弹出over界面，游戏结束


var content = document.getElementById("content");
var startPage = document.getElementById("startPage");
var startBtn = document.getElementById("startBtn");
var scoreBox = document.getElementById("score");
var overPage = document.getElementById("overPage");
var overScore = document.getElementById("overScore");
var startP = document.getElementById("startP");
var closeBtn = document.getElementById("closeBtn");
var startPaushBool = true;
var startGameBool = true;
var timer = null;
var speed = 200;
init();

//初始化函数
function init(){
    //地图数据
    this.mapW = parseInt(window.getComputedStyle(content,null).width);
    this.mapH = parseInt(window.getComputedStyle(content,null).height);
    this.mapDiv = content;
    //食物数据 宽度 高度 x坐标 y坐标
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[2,0,"head"],[1,0,"body"],[0,0,"body"]];
    //方向
    this.direct = "right";
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    //分数
    this.score = 0;
    //事件绑定；
    bindEven();
}
//开始游戏
function startGame (){
    startPage.style.display = "none";
    startP.style.display = "block";
    food();
    snake();
}
 //随机生成食物
function food(){
    var foodDiv = document.createElement("div");
    foodDiv.style.position = "absolute";
    foodDiv.style.width = this.foodW + "px";
    foodDiv.style.height  = this.foodH + "px";
    this.foodX = Math.floor(Math.random()*(this.mapW/20 - 1));
    this.foodY = Math.floor(Math.random()*(this.mapH/20 - 1));
    foodDiv.style.left = this.foodX*20 + "px";
    foodDiv.style.top = this.foodY*20 + "px";
    this.mapDiv.appendChild(foodDiv).setAttribute("class","food");
}

//生成蛇；
function snake(){
    for(var i = 0; i<this.snakeBody.length;i++){
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + "px";
        snake.style.height = this.snakeH + 'px';
        snake.style.position = "absolute";
        snake.style.top = this.snakeBody[i][1]*20 + "px";
        snake.style.left = this.snakeBody[i][0]*20 +"px";
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch(this.direct){
            case "right":
                break;
            case "left":
                snake.style.transform = "rotate(180deg)";
                break;
            case "up":
                snake.style.transform = "rotate(270deg)";
                break;
            case "down":
                snake.style.transform = "rotate(90deg)";
                break;
        }
    }
}

//蛇的移动
function move (){
    for(var i = this.snakeBody.length-1; i>0;i--){
        this.snakeBody[i][0] = this.snakeBody[i-1][0];
        this.snakeBody[i][1] = this.snakeBody[i-1][1];
    }
    switch(this.direct){
        case "right":
            this.snakeBody[0][0] += 1;
            break;
        case "left":
            this.snakeBody[0][0] -= 1;
            break;
         case "up":
            this.snakeBody[0][1] -= 1;
            break;
         case "down":
            this.snakeBody[0][1] += 1;
            break;
    }
    removeDiv("snake");
    snake();
    if(this.snakeBody[0][0] == foodX && this.snakeBody[0][1] == foodY){
        var endX = this.snakeBody[this.snakeBody.length - 1][0];
        var endY = this.snakeBody[this.snakeBody.length - 1][1];
        switch(this.direct){
            case "right":
                this.snakeBody.push([endX - 1,endY,"body"]);
                break;
            case "left":
                this.snakeBody.push([endX + 1,endY,"body"]);
                break;
             case "up":
                this.snakeBody.push([endX,endY + 1,"body"]);
                break;
             case "down":
                this.snakeBody.push([endX,endY - 1,"body"]);
                break;
        }
        this.score +=1;
        scoreBox.innerHTML = this.score;
        removeDiv("food");
        food();
    }
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW/20){
        relodGame();
    }
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH/20){
        relodGame();
    }
    var headX = this.snakeBody[0][0];
    var headY = this.snakeBody[0][1];
    for(var i = 1;i<this.snakeBody.length;i++){
        if(headX == this.snakeBody[i][0] && headY == this.snakeBody[i][1]){
            relodGame();
        }
    }
    
}

//结束时调用
function relodGame(){
    removeDiv("snake");
    removeDiv("food");
    clearInterval(timer);
    this.direct = "right";
    this.right = false;
    this.left = false;
    this.up = true;
    this.down = true;
    this.snakeBody = [[2,0,"head"],[1,0,"body"],[0,0,"body"]];
    overPage.style.display = "block";
    overScore.innerHTML = this.score;
    this.score = 0;
    scoreBox.innerHTML = this.score;
    startPaushBool = true;
    startGameBool = true;
    startP.setAttribute("src","img/start.png");
}

//移除div
function removeDiv(classname){
    var ele = document.getElementsByClassName(classname);
    while(ele.length>0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}

//方向的设置
function setDirect(_code){
    switch(_code){
        case 37:
            if(this.left){
                this.direct = "left";
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
         case 38:
            if(this.up){
                this.direct = "up";
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if(this.right){
                this.direct = "right";
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
         case 40:
            if(this.down){
                this.direct = "down";
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function bindEven (){
    closeBtn.onclick = function(){
        overPage.style.display = "none";
    }
    startBtn.onclick = function(){
        startAndPaush();
    }
    startP.onclick = function(){
        startAndPaush();
    }
}

//游戏运行的逻辑函数
function startAndPaush(){
    if(startPaushBool){
        if(startGameBool){
            startGame();
            startGameBool = false;
        }
        startP.setAttribute("src","img/pause.png");
        document.onkeydown = function(e){
            var code = e.keyCode;
            setDirect(code);
        }
        timer = setInterval(function(){
            move();
        },speed);
        startPaushBool = false;
    }else{
        startP.setAttribute("src","img/start.png");
        clearInterval(timer);
        document.onkeydown = function(e){
            e.returnValue = false;
            return false;
        }
        startPaushBool = true;
    }
}