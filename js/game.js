var Game = function () {
  //游戏元素
  var gameDiv;
  var nextDiv;
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
  }

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
  }
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
  }
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
  }
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
  }
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
  }

  var down = function () {
    if ()
      clearData();
    cur.origin.x++;
    setData();
    refresh(gameData, gameDivs);
  }
  /**
   * 初始化方法
   */
  var init = function (doms) {
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    cur = new Square();
    next = new Square();
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    cur.origin.x = 10;
    cur.origin.y = 5;
    setData()
    refresh(gameData, gameDivs);
    refresh(next.data, nextDivs);
  }
  //导出API
  this.init = init;
  this.down = down;
}

