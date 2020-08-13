const express = require("express");
const { env } = require("../env");

const fs = require('fs');

// instanta de Router
const POSTRouter = express.Router();

module.exports.POSTRouter = POSTRouter;

// .get(path, callback)
POSTRouter.get("/", getPOSTClient);

function getPOSTClient(_req, res, next) {

    try {

        console.log('before reading file (post.js)');
        fs.readFile('src/form.html', 'UTF-8', (error, data) => {

            if (error) {
                console.log(error);
                res.write(String(error));
                res.end();
            } else {
                // console.log(data);
                console.log('after reading file (post.js)');

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);

                var fname = _req.query['fname'];
                var lname = _req.query['lname'];

                console.log(`Your name is ${fname} and your age is ${lname}.`);

                console.log('res in (get.js)');
                // console.log(res);

                res.end();
                return res;
            }

        });

        // // var name = _req.body['name'];
        // // var age = _req.body['age'];

        // var name = _req.body.name;
        // var age = _req.body.age;

        // var name = _req.query['fname'];
        // var age = _req.query['lname'];

        // res.send(`Your name is ${fname} and your age is ${lname}.`);

        // console.log('res in (get.js)');
        // console.log(res);

        // return res.end();

        // // const clientSettings = env.POST_ROUTE;
        // // res.write(clientSettings);
        // // return res.end();

    } catch (ex) {
        return next(ex);
    }
}