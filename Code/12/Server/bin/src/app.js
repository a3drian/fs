"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApp = void 0;
const cors = require('cors');
// Heroku^
const express = require('express');
const express_1 = require("express");
const env_1 = require("./env");
const mikro_orm_1 = require("mikro-orm");
const entities_1 = require("./entities");
const bodyParser = require("body-parser");
// 8:
const inventory_items_route_1 = require("./routes/inventory-items.route");
// 9:
const warehouses_route_1 = require("./routes/warehouses.route");
let app;
async function makeApp() {
    if (app)
        return app;
    app = express();
    app.use(cors());
    app.use(express.static('build'));
    const orm = await mikro_orm_1.MikroORM.init({
        metadataProvider: mikro_orm_1.ReflectMetadataProvider,
        cache: { enabled: false },
        entities: entities_1.default,
        dbName: env_1.env.DB_NAME,
        clientUrl: env_1.env.MONGO_URL,
        type: 'mongo',
        autoFlush: false
    });
    // make the entity manager available in request
    app.use((req, _res, next) => {
        req.em = orm.em.fork(); // em = entity manager
        next();
    });
    console.log('env:', env_1.env);
    // middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    // routes
    app.use(env_1.env.INVENTORY_ITEMS_ROUTE, inventory_items_route_1.setInventoryItemRoute(express_1.Router()));
    app.use(env_1.env.WAREHOUSES_ROUTE, warehouses_route_1.setWarehouseRoute(express_1.Router()));
    // 404
    app.use((_req, _res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    // 500
    app.use((err, _req, res, _next) => {
        res.status(err.status || 500)
            .send(env_1.env.NODE_ENV === 'development' ? err : {});
    });
    return app;
}
exports.makeApp = makeApp;
//# sourceMappingURL=app.js.map