const express = require("express");
const { env } = require("../env");

// instanta de Router
const PUTRouter = express.Router();

module.exports.PUTRouter = PUTRouter;

// .get(path, callback)
PUTRouter.get("/", getPUTClient);

function getPUTClient(_req, res, next) {
	try {
		const clientSettings = env.PUT_ROUTE;
		res.write(clientSettings);
		return res.end();
	} catch (ex) {
		return next(ex);
	}
}