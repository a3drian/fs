const PORT = 8080;
const PORT_SERVER = 8089;

// import the 'http' module
const http = require('http');

// create a server object with a given callback function
const server = http.createServer(onIncomingRequest);

// start listening for requests by attach it to a port
server.listen(PORT);

// // function callback for incoming requests
// // first param is the request object, created by Node for us
// // second param is the response object that we need to manipulate
// function onIncomingRequest(request, response) {

//     console.log(request);    

//     // write a response to the client
//     response.write('Bravo, ma man!');

//     // end the response
//     response.end();
// }

const fs = require('fs');

// onIncomingRequest() rescrisa pentru a permite raspuns de la 3 endpoint-uri diferite
function onIncomingRequest(request, response) {
    if (request.url === '/') {

        // prep the response string as before, only format it as valid html
        const htmlResponseString = "<html><body><p>Freeze, I'm ma Baker! Put your hands in the air and give me all your money!</p></body></html>";

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(htmlResponseString);
        response.end();

    } else if (request.url === "/index.html") {

        // read the index.html file from disk, the SYNC way (this blocks current thread until read is complete and must be avoided)
        // this is only a demo for a simple http server, so we can do it this way

        // const indexHtmlFileContent = fs.readFileSync("example_fs.js", "UTF-8");

        // response.writeHead(200, { 'Content-Type': 'text/html' });
        // response.write(data);
        // response.end();

        console.log('standing by');
        fs.readFile("example_fs.js", "UTF-8", (error, data) => {

            if (error) {
                // console.log(error);
                response.write(String(error));
                response.end();
            } else {
                console.log(data);
                console.log('after reading file');

                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            }
        });

    } else if (request.url === "/api/mabaker") {

        // this would be an API call, let's respond with a json
        // yes, this is a valid json, "what ever" is a valid key according to specs
        const jsonResponse = {
            freeze: "I'm ma Baker",
            "Put your hands in the air": "give me all your money"
        };

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(jsonResponse));
        response.end();
    }
}

// const fs = require('fs');
// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// };

// const https = require('https');
// const server = https.createServer(options, onIncomingRequest);

// server.listen(PORT);

// function onIncomingRequest(request, response) {

//     console.log(request);

//     // prep the response string as before, only format it as valid html
//     const htmlResponseString = "<html><body><p>Freeze! I'm ma Baker! Put your hands in the air and give me all your money!</p></body></html>";

//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.write(htmlResponseString);
//     response.end();
// }

// var express = require('express');
// var https = require('https');
// var http = require('http');
// var fs = require('fs');

// // This line is from the Node.js HTTPS documentation.
// var options = {
//   key: fs.readFileSync('key.pem'),
//   certificate: fs.readFileSync('cert.pem')
// };

// // Create a service (the app object is just a callback).
// var app = express();

// // Create an HTTP service.
// http.createServer(app).listen(PORT);
// // Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(PORT_SERVER);