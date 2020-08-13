// const express = require("express");
import * as express from "express";

// const { env } = require("../env");
// import * as env from "../env";
import { env } from "../env";

const discoveryClientRouter = express.Router();

discoveryClientRouter.get("/", getdiscoveryClient);

function getdiscoveryClient(_req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const clientSettings = {
			jsonRoute: env.A_JSON_ROUTE
		};
		return res.json(clientSettings);
	} catch (ex) {
		return next(ex);
	}
}

export { discoveryClientRouter };
