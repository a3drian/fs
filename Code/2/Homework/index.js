const express = require('express');
const fs = require('fs');

const PORT = 8080;

const app = express();

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

app.get("/", (req, res) => {
    console.log(req);

    console.log('before reading file');
    fs.readFile('index.html', 'UTF-8', (error, data) => {

        if (error) {
            // console.log(error);
            res.write(String(error));
            res.end();
        } else {
            console.log(data);
            console.log('after reading file');

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
})

app.get("/get", (req, res) => {
    console.log(req);
    res.send('This is a GET request');
});

app.post("/post", (req, res) => {
    console.log(req);
    res.send('This is a POST request');
});

app.put("/put", (req, res) => {
    console.log(req);
    res.send('This is a PUT request');
});

app.delete("/delete", (req, res) => {
    console.log(req);
    res.send('This is a DELETE request');
});

