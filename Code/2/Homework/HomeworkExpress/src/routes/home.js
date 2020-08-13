const express = require("express");
const fs = require('fs');

// instanta de Router
const homeRouter = express.Router();

module.exports.homeRouter = homeRouter;

// .get(path, callback)
homeRouter.get("/", getHomeClient);

function getHomeClient(_req, res, next) {
    try {
        console.log('before reading file (home.js)');
        fs.readFile('src/index.html', 'UTF-8', (error, data) => {

            if (error) {
                console.log(error);
                res.write(String(error));
                res.end();
            } else {
                // console.log(data);
                console.log('after reading file (home.js)');

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
                return res;
            }
        });
    } catch (ex) {
        return next(ex);
    }
}