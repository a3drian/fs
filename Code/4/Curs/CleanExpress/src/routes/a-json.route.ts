// import { Router, Request, Response, NextFunction } from "express";
// import * as aJsonService from "../services/a-json.service";

// export function setAJsonRoute(router: Router): Router {
// 	router.get("/", getAJson);
// 	return router;
// }

// function getAJson(_req: Request, res: Response, next: NextFunction) {
// 	try {
// 		const jsonData = aJsonService.getAJson();
// 		return res.json(jsonData);
// 	} catch (ex) {
// 		return next(ex);
// 	}
// }

import { Router, Response, NextFunction } from "express";
import { EntityManager } from "mikro-orm";
import { AJson } from "../entities/a-json.entity";
import { IExpressRequest } from "../interfaces/IExpressRequest";
import * as jsonService from "../services/a-json.service";

export { setAJsonRoute };

function setAJsonRoute(router: Router): Router {
	router.get("/", getAJson);
	router.post("/", postAJson);

	return router;
}

async function getAJson(req: IExpressRequest, res: Response, next: NextFunction) {
	if (!req.em || !(req.em instanceof EntityManager)) {
		return next(Error("EntityManager not available"));
	}

	let aJson: Error | AJson | null;
	try {
		// serviciul care aduce un JSON din mongo prin entity manager de orm
		aJson = await jsonService.getAJson(req.em, req.query.key1 as string);
	} catch (ex) {
		return next(ex);
	}

	if (aJson instanceof Error) {
		return next(aJson);
	}

	if (aJson === null) {
		return res.status(404).end();
	}

	return res.json(aJson);
}

async function postAJson(req: IExpressRequest, res: Response, next: NextFunction) {
	if (!req.em || !(req.em instanceof EntityManager)) {
		return next(Error("EntityManager not available"));
	}

	let aJson: Error | AJson;
	try {
		// prin POST raspunsul vine in corpul request-ului "req.body"
		aJson = await jsonService.saveAJson(req.em, req.body);
	} catch (ex) {
		return next(ex);
	}

	// daca a aparut o eroare, mergem cu aceasta eroare la urmatorul middleware
	if (aJson instanceof Error) {
		return next(aJson);
	}

	// daca nu a aparut o eroare, intoarcem status code 201 => CREATED
	// de asemenea, intoarcem fisierul JSON rezultat
	return res.status(201).json(aJson);
}