const express = require("express");
const { env } = require("../env");

// instanta de Router
const POSTRouter = express.Router();

module.exports.POSTRouter = POSTRouter;

// .get(path, callback)
POSTRouter.get("/", getPOSTClient);

function getPOSTClient(_req, res, next) {
	try {
		const clientSettings = env.POST_ROUTE;
		res.write(clientSettings);
		return res.end();
	} catch (ex) {
		return next(ex);
	}
}
