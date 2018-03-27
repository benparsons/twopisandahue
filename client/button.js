var Gpio = require('onoff').Gpio;

var button = new Gpio(4, 'in', 'both');

button.watch(function (err, value) {
  if (err) {
    console.error("Error: " + err);
    return;
  }
  console.log("value: " + value);
});

function unexportOnClose() {
  button.unexport();
}

