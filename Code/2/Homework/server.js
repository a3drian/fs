const PORT = 8088;

const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const https = require('https');
const server = https.createServer(options, onIncomingRequest);

server.listen(PORT);

function onIncomingRequest(request, response) {

    console.log(request);

    // prep the response string as before, only format it as valid html
    const htmlResponseString = `
    <html>
        <body>
            <p>This is an HTTPS Server.</p>
        </body>
    </html>`;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(htmlResponseString);
    response.end();
}