﻿const express = require("express");
const { env } = require("../env");

// instanta de Router
const GETRouter = express.Router();

module.exports.GETRouter = GETRouter;

// .get(path, callback)
// GETRouter.get("/api/users", getGETClient);
GETRouter.get("/", getGETClient);

function getGETClient(_req, res, next) {
    try {

        // const clientSettings = env.GET_ROUTE;
        // res.write(clientSettings);
        // return res.end();

        var name = _req.query['name'];
        var age = _req.query['age'];

        res.send(`Your name is ${name} and your age is ${age}.`);

        console.log('res in (get.js)');
        console.log(res);

        return res.end();

    } catch (ex) {
        return next(ex);
    }
}