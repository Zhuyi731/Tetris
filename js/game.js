var Game = function () {
  //游戏元素
  var gameDiv;
  var nextDiv;
  var scoreDiv;
  var timeDiv;
  var resultDiv;
  //分数
  var score = 0;
  var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  var nextData = [
    [2, 2, 0, 0],
    [0, 2, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  //当前方块
  var cur;
  var next;
  //divs
  /**
   * nextDivs和gameDivs是用来存储DOM节点的  
   * nextData和gameData是用来存储数据的     
   */
  var nextDivs = [];
  var gameDivs = [];
  //初始化div
  var initDiv = function (container, data, divs) {
    var divs2 = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var Div = [];
      var divs1 = document.createDocumentFragment();
      for (var j = 0; j < data[0].length; j++) {
        var newNode = document.createElement('div');
        newNode.className = "none";
        newNode.style.top = (i * 20) + "px";
        newNode.style.left = (j * 20) + "px";
        divs1.appendChild(newNode);
        Div.push(newNode);
      }
      divs2.appendChild(divs1);
      divs.push(Div);
    }
    container.appendChild(divs2);
  };

  var refresh = function (data, divs) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] == 0) {
          divs[i][j].className = "none";
        } else if (data[i][j] == 1) {
          divs[i][j].className = "done";
        } else {
          divs[i][j].className = "current";
        }
      }
    }
  };
  /**
  * 检测数据是否合法
  */
  var isValid = function (pos, data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!check(pos, i, j)) {
            return false;
          }
        }
      }
    }
    return true;
  };
  /**
   * 清除之前的数据
   */
  var clearData = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  };
  /**
   * 检测点是否合法
   */
  var check = function (pos, x, y) {
    if (pos.x + x < 0 || pos.x + x >= gameData.length
      || pos.y + y < 0 || pos.y + y >= gameData[0].length || gameData[pos.x + x][pos.y + y] == 1) {
      return false;
    } else {
      return true;
    }
  };

  /**  
   * 设置数据
   */
  var setData = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
        }
      }
    }
  };
  var down = function () {
    if (cur.canDown(isValid)) {
      clearData();
      cur.origin.x++;
      setData();
      refresh(gameData, gameDivs);
      return true;
    } else {
      return false;
    }
  };
  var up = function () {
    if (cur.canRotate(isValid)) {
      clearData();
      cur.rotate();
      setData();
      refresh(gameData, gameDivs);
    }
  };
  var left = function () {
    if (cur.canLeft(isValid)) {
      clearData();
      cur.origin.y--;
      setData();
      refresh(gameData, gameDivs);
    }
  };
  var right = function () {
    if (cur.canRight(isValid)) {
      clearData();
      cur.origin.y++;
      setData();
      refresh(gameData, gameDivs);
    }
  };
  var space = function () {
    while (down()) { };
  };
  var fixed = function () {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
          }
        }
      }
    }
    refresh(gameData, gameDivs);
  }
  //消行
  var checkClear = function () {
    var line = 0;//消去的行数
    for (var i = gameData.length - 1; i >= 0; i--) {
      var clear = true;
      for (var j = 0; j < gameData[0].length; j++) {
        if (gameData[i][j] != 1) {
          clear = false;
          break;
        }
      }
      if (clear) {
        line++;
        for (var a = i; a > 0; a--) {
          for (var b = 0; b < gameData[0].length; b++) {
            gameData[a][b] = gameData[a - 1][b];
          }
        }
        for (var n = 0; n < gameData[0].length; n++) {
          gameData[0][n] = 0;
        }
        i++;
      }
    }
    return line;
  }
  //检查游戏结束
  var checkGameOver = function () {
    var gameOver = false;
    if (gameData[0][5] == 1 || gameData[0][4] == 1) {
      gameOver = true;
    }
    return gameOver;
  }
  //使用下一个方块
  var performNext = function (type, nextType) {
    cur = next;
    setData();
    next = eval("square" + type);
    next.origin = {
      x: 0,
      y: 3
    };
    refresh(gameData, gameDivs);
    refresh(next.data, nextDivs);
  }
  var setTime = function (time) {
    timeDiv.innerHTML = time;
  }
  /**
   * 
   * @param {*} line//消去的函数 
   */
  var addScore = function (line) {
    var s = [0, 10, 30, 60, 100];
    score = score + s[line];
    scoreDiv.innerHTML = score;
  }
  //游戏结束
  var gameover = function(win){
    if(win){
      resultDiv.innerHTML = "你赢了!";
    }else{
      resultDiv.innerHTML = "你输了!";
    }
  }
  //底部增加行
  var addTailLines = function(lines){
    for(var i = 0;i<gameData.length - lines.length ; i++){
      gameData[i] = gameData[i+lines.length];
    }
    for(var i = 0 ;i<lines.length ;i ++){
      gameData[gameData.length - lines.length + i] = lines[i];
    }
    cur.origin.x = cur.origin.x - lines.length;
    if(cur.origin.x < 0){
      cur.origin.x = 0;
    }
    refresh(gameData,gameDivs);
  }
  /**
   * 初始化方法
   */
  var init = function (doms, type) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    timeDiv = doms.timeDiv;
    scoreDiv = doms.scoreDiv;
    resultDiv = doms.resultDiv;
    cur = eval("square" + type);
    next = eval("square" + type);
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    cur.origin.x = 1;
    cur.origin.y = 3;
    setData()
    refresh(gameData, gameDivs);
    refresh(next.data, nextDivs);
  };
  //导出API
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.up = up;
  this.space = space;
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;
  this.gameData = gameData;
  this.setTime = setTime;
  this.addScore = addScore;
  this.gameover = gameover;
  this.addTailLines = addTailLines;
}

