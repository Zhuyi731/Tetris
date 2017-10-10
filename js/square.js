var Square = function () {
  //方块数据
  this.data = [];
  //原点
  this.origin = {
    x: 1,
    y: 4
  };
  this.dir = 0;
  this.rotates = [];
}

Square.prototype.canRotate = function (isValid) {
  var d = this.dir + 1;
  var test = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  if (d == 4) {
    d = 0;
  }
  test = this.rotates[d];
  return isValid(this.origin, test);
};
Square.prototype.rotate = function () {
  this.dir = this.dir + 1;
  if (this.dir == 4) {
    this.dir = 0;
  }
  this.data = this.rotates[this.dir];
}
Square.prototype.canDown = function (isValid) {
  var test = {};
  test.x = this.origin.x + 1;
  test.y = this.origin.y;
  return isValid(test, this.data);
};
Square.prototype.canRight = function(isValid){
  var test = {};
  test.x = this.origin.x;
  test.y = this.origin.y + 1;
  return isValid(test, this.data);
  
}
Square.prototype.canLeft = function(isValid){
  var test = {};
  test.x = this.origin.x;
  test.y = this.origin.y - 1;
  return isValid(test, this.data);
}
