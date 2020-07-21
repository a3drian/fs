const express = require("express");
const { env } = require("../env");

// instanta de Router
const GETRouter = express.Router();

module.exports.GETRouter = GETRouter;

// .get(path, callback)
GETRouter.get("/", getGETClient);

function getGETClient(_req, res, next) {
	try {
		const clientSettings = env.GET_ROUTE;
		res.write(clientSettings);
		return res.end();
	} catch (ex) {
		return next(ex);
	}
}
