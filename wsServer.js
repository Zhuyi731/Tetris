var app = require('http').createServer();

var io = require("socket.io")(app);

var PORT = 3000;

//客户端计数
var clientCount = 0;

app.listen(PORT);

//用来存储客户端socket
var socketMap = {};

io.on('connection', function (socket) {

    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if (clientCount % 2 == 1) {
        socket.emit("waiting", "waiting for another person。。。");
    } else {
        socket.emit("start");
        socketMap[(clientCount - 1)].emit("start");
    }

    socket.on('disconnect', function () {
        clientCount--;
    });

});

console.log("websocket listening on port " + PORT);