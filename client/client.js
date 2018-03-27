var Gpio = require('onoff').Gpio;
var button = new Gpio(4, 'in', 'both');
var socket = require('socket.io-client')("http://raspberrypi1.local:3000");
socket.on('connect', function(){
  console.log("connected");
  //socket.emit("hello", 1);
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

button.watch(function (err, value) {
  if (err) {
    console.error("Error: " + err);
    return;
  }
  console.log("value: " + value);
  if (value === 0) socket.emit("hello", value);
});

function unexportOnClose() {
  button.unexport();
}

