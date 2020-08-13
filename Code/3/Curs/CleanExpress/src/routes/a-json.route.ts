// const express = require("express");
// nu folosim 'import express from "express"' pentru ca l-am instalat ca modul de JavaScript
// pentru ca "express" sa fie interpretat de Typescript, atunci trebuie sa ii gasim varianta Typescript pentru "express"
import * as express from "express";

// const aJsonService = require("../services/a-json.service");
import * as aJsonService from "../services/a-json.service";

// instanta de Router
const aJsonRouter = express.Router();

// .get(path, callback)
aJsonRouter.get("/", getAJson);

// function getAJson(_req, res, next) {
function getAJson(_req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const jsonData = aJsonService.getAJson();
		return res.json(jsonData);
	} catch (ex) {
		return next(ex);
	}
}

export { aJsonRouter };
