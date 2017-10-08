var Local = function(){
  //游戏对象
  var game ;
  //绑定键盘事件
  var bindKeyEvent = function(){
    document.onkeydown = function(e){
      switch(e.keyCode){
        case 38:// up
        break;
        case 39://right
        break;
        case 40://down
        game.down();
        break;
        case 37: //left
        break;
        case 32: //space
        break;
        default:
        break;
      }
    }
  }
  //开始
  var start = function(){
    var doms= {
      gameDiv:$("#game")[0],
      nextDiv:$("#next")[0]
    }
    game = new Game();
    game.init(doms);
    bindKeyEvent();
  }
  //导出api
  this.start = start;
}