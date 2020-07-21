const express = require("express");
const aJsonService = require("../services/a-json.service");

// instanta de Router
const aJsonRouter = express.Router();

module.exports.aJsonRouter = aJsonRouter;

// .get(path, callback)
aJsonRouter.get("/", getAJson);

function getAJson(_req, res, next) {
	try {
		const jsonData = aJsonService.getAJson();
		return res.json(jsonData);
	} catch (ex) {
		return next(ex);
	}
}
