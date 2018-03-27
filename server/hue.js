var http = require('http');

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
req.write('{"on":true}');
//req.write('data\n');
req.end();



