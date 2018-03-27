var Gpio = require('onoff').Gpio;

var LED = new Gpio(4, 'out');
var button = new Gpio(5, 'in', 'both');

button.watch(function (err, value) {
  if (err) {
    console.error("Error: " + err);
    return;
  }
  console.log("value: " + value);
  if (value === 1) {
    LED.writeSync(1 - LED.readSync());
  }
});

function unexportOnClose() {
  LED.writeSync(0);
  LED.unexport();
  button.unexport();
}

process.on('SIGINT', unexportOnClose);
