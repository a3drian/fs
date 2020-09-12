// Heroku:
import { MongoDriver } from 'mikro-orm/dist/drivers/MongoDriver';
const cors = require('cors');
// Heroku^

const express = require('express');
import { Application, Router, Request, Response, NextFunction } from 'express';

import { env } from './env';

import { setDiscoveryClientRoute } from './routes/discovery-client.route';
import { setAJsonRoute } from './routes/a-json.route';
import { IExpressError } from './interfaces/IExpressError';
import { MikroORM, ReflectMetadataProvider } from 'mikro-orm';
import entities from './entities';
import { IExpressRequest } from './interfaces/IExpressRequest';
import * as bodyParser from 'body-parser';
// 8:
import { setInventoryItemRoute } from './routes/inventory-items.route';
// 9:
import { setWarehouseRoute } from './routes/warehouses.route';

let app: Application;

async function makeApp(): Promise<Application> {
	if (app) return app;

	app = express();
	app.use(cors());

	app.use(express.static('build'));

	const orm = await MikroORM.init<MongoDriver>({
		metadataProvider: ReflectMetadataProvider,
		cache: { enabled: false },
		entities: entities,
		dbName: env.DB_NAME,
		clientUrl: env.MONGO_URL,
		type: 'mongo',
		autoFlush: false
	});
	// await orm.em.getDriver().createCollections();

	// make the entity manager available in request
	app.use((req: IExpressRequest, _res: Response, next: NextFunction) => {
		req.em = orm.em.fork();	// em = entity manager
		next();
	});

	console.log('env:', env);

	// middleware
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(bodyParser.json());

	// routes
	app.use(env.DISCOVERY_CLIENT_ROUTE, setDiscoveryClientRoute(Router()));
	app.use(env.A_JSON_ROUTE, setAJsonRoute(Router()));
	app.use(env.INVENTORY_ITEMS_ROUTE, setInventoryItemRoute(Router()));
	app.use(env.WAREHOUSES_ROUTE, setWarehouseRoute(Router()));

	// 404
	app.use((_req: Request, _res: Response, next: NextFunction) => {
		const err = new Error('Not Found') as IExpressError;
		err.status = 404;
		next(err);
	});

	// 500
	app.use((err: IExpressError, _req: Request, res: Response, _next: NextFunction) => {
		res.status(err.status || 500)
			.send(env.NODE_ENV === 'development' ? err : {});
	});

	return app;
}

export { makeApp };
