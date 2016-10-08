var http = require('http');

// socke.ioのインポート
var socketio = require("socket.io");

// ファイルシステムモジュールのインポート
var fs = require("fs");

// server変数へインスタンスを保持するよう変更
//http.createServer(function (request, response) {
//  response.writeHead(200, {'Content-Type': 'text/plain'});
var server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  var output = fs.readFileSync("./index.html", "utf-8");
  //response.end('Hello World\n');
  response.end(output);
//}).listen(8124);
}).listen(process.env.VMC_APP_PORT || 3000);

console.log('Server running at http://127.0.0.1:3000/');

var io = socketio.listen(server);

// socketioの処理 
io.sockets.on("connection", function (socket) {

  // メッセージ送信
  socket.on("C_to_S_message", function (data) {
    io.sockets.emit("S_to_C_message", {value:data.value});
  });

  // ブロードキャスト
  socket.on("C_to_S_broadcast", function (data) {
    socket.broadcast.emit("S_to_C_message", {value:data.value});
  });

  // 切断したときに送信
  socket.on("disconnect", function () {
    // io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
});





