var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');

var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  console.log("connection: " + client.toString());
  client.on('hello', function(data){
    console.log("hello event: " + data.toString());
    LED.writeSync(1 - data);
  });
  client.on('disconnect', function(){});
});
server.listen(3000);

function unexportOnClose() {
  LED.writeSync(0);
  LED.unexport();
}

process.on('SIGINT', unexportOnClose);

