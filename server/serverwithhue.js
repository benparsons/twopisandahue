var http = require('http');
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');

var options = {
  host: '192.168.0.31',
  port: 80,
  path: '/api/-JKFTuwADUrE9HFIitKITcfzI8ST62LdLBkQ-FRw/lights/1/state',
  method: 'PUT'
};


var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function(client){
  console.log("connection: " + client.toString());
  client.on('hello', function(data){
    console.log("hello event: " + data.toString());
    var LEDstatus = LED.readSync();
    LED.writeSync(1 - LEDstatus);
    sendHueRequest(LEDstatus === 0);
  });
  client.on('disconnect', function(){});
});
server.listen(3000);

function unexportOnClose() {
  LED.writeSync(0);
  LED.unexport();
}

process.on('SIGINT', unexportOnClose);

function sendHueRequest(state) {
  var options = {
    host: '192.168.0.31',
    port: 80,
    path: '/api/-JKFTuwADUrE9HFIitKITcfzI8ST62LdLBkQ-FRw/lights/1/state',
    method: 'PUT'
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write('{"on":' + state +'}');
  //req.write('data\n');
  req.end();
}

