var Local = function(socket){
  //游戏对象
  var game ;
  //定时器
  var timer;
  //时间计数器
  var timeCount = 0;
  //时间
  var time = 0;
 //下落时间间隔
 var INTERVAL = 200;
  //绑定键盘事件
  var bindKeyEvent = function(){
    document.onkeydown = function(e){
      switch(e.keyCode){
        case 38:// up
          game.up();
        break;
        case 39://right
          game.right();
        break;
        case 40://down
           game.down();
        break;
        case 37: //left
          game.left();
        break;
        case 32: //space
          game.space();
        break;
        default:
        break;
      }
    }
  }
  //下落 
  var move =function(){
    timeFunc();
    if(!game.down()){
      game.fixed();
      var line = game.checkClear();
      if(line){
        game.addScore(line);
      }
      if(game.checkGameOver()){
        game.gameover(false);
        stop();
      }else{
        game.performNext(generateType(),generateDir());
      }
    }
  }
  //计时
  var timeFunc = function(){
    timeCount ++;
    if(timeCount == 5){
      timeCount = 0;
      time ++;
      game.setTime(time);

      if(time % 10 == 0){
        game.addTailLines(generateBottomLine(1));
      }
    }
  }
  //随机生产一个方块
  var generateType = function(){
    return Math.ceil(Math.random() * 7);
  }
  //随机生产一个方块
  var generateDir = function(){
    return Math.ceil(Math.random() * 4) -1;
  }
  //随机生产干扰行
  var generateBottomLine = function(lineNum){
    var lines = [];
    for(var i = 0;i<lineNum;i++){
      var line = [];
      for(j=0;j<10;j++){
        line.push(Math.ceil(Math.random()*2-1));
      }
      lines.push(line);
    }
    return lines;
  }
  //开始
  var start = function(){
    timer = setInterval(move , INTERVAL);
    var doms= {
      gameDiv:$("#local_game")[0],
      nextDiv:$("#local_next")[0],
      timeDiv:$("#local_time")[0],
      scoreDiv:$("#local_score")[0],
      resultDiv:$("#local_gameOver")[0]
    }
    game = new Game();
    game.init(doms,generateType());
    bindKeyEvent();
  }
  var stop = function(){
    if(timer){
      clearInterval(timer);
      timer = null;
      document.onkeydown = null;
    }else{

    }
  }
  socket.on("start",function(str){
    $("#waiting").html("");
    start();
  });
  //导出api
  this.start = start;
}