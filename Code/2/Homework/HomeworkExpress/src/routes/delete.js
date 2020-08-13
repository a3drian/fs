const express = require("express");
const { env } = require("../env");

// instanta de Router
const DELETERouter = express.Router();

module.exports.DELETERouter = DELETERouter;

// .get(path, callback)
DELETERouter.get("/", getDELETEClient);

function getDELETEClient(_req, res, next) {
    try {
        const clientSettings = env.DELETE_ROUTE;
        res.write(clientSettings);
        return res.end();
    } catch (ex) {
        return next(ex);
    }
}