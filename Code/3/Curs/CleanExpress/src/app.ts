// const express = require("express");
import * as express from "express";

// const { env } = require("./env");
import { env } from "./env";

// const { discoveryClientRouter } = require("./routes/discovery-client.route");
// const { aJsonRouter } = require("./routes/a-json.route");
import { discoveryClientRouter } from "./routes/discovery-client.route"; // acelasi nume ca in discovery-client.route.ts
import { aJsonRouter } from "./routes/a-json.route";
import { IExpressError } from "./interfaces/IExpressError";

// se va exporta la sfarsit
// module.exports.makeApp = makeApp;

let app: express.Application; // am tipizat pe app

// function makeApp() {
const makeApp = function () {
	if (app) return app;

	app = express();

	// routes
	// primele 2 callbacks din pipeline
	app.use(env.DISCOVERY_CLIENT_ROUTE, discoveryClientRouter);
	app.use(env.A_JSON_ROUTE, aJsonRouter);

	// 404
	// al treilea din pipeline
	// un raspuns generic de eroare 404
	// se creeaza obiectul de eroare si se trimite urmatorului middleware
	app.use((_req: express.Request, _res: express.Response, next: express.NextFunction) => {
		const err = new Error("Not Found") as IExpressError;	// am adaugat interfata
		err.status = 404;
		next(err);
	});

	// 500
	// este practic un error handler, pentru ca are 'err' ca prim parametru
	// unde 'err' este un obiect de tip eroare
	// se observa diferenta intre antetul celui de al treilea middleware, ala cu 404:
	// app.use((_req, _res, next) vs. app.use((err, _req, res, _next)
	app.use((err: IExpressError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
		res.status(err.status || 500)
			.send(env.NODE_ENV === "development" ? err : {}); // daca suntem in 'development', printam in browser, altfel un obiect de eroare gol
	});

	// dupa 500 nu se mai intampla nimic, asta e ultimul middleware
	// ultimul callback din pipeline

	return app;
};

export { makeApp };
