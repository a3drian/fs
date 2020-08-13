const PORT_CLIENT = 8089;

var express = require('express');
var https_server = require('https');
// var http = require('http');
// var fs = require('fs');

// // This line is from the Node.js HTTPS documentation.
// var options = {
//   key: fs.readFileSync('key.pem'),
//   certificate: fs.readFileSync('cert.pem')
// };

// Create a service (the app object is just a callback).
var app = express();

// // Create an HTTP service.
// http.createServer(app).listen(PORT);
// Create an HTTPS service identical to the HTTP service.
https_server.createServer(options, app).listen(PORT_CLIENT);