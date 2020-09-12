"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAJsonRoute = void 0;
const mikro_orm_1 = require("mikro-orm");
const jsonService = require("../services/a-json.service");
const log_1 = require("../log");
function setAJsonRoute(router) {
    router.get('/', getAJson);
    router.get('/:key1', getAJson);
    router.post('/', postAJson);
    return router;
}
exports.setAJsonRoute = setAJsonRoute;
async function getAJson(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    let aJson;
    try {
        // serviciul care aduce un JSON din mongo prin entity manager de orm
        aJson = await jsonService.getAJson(req.em, req.query.key1);
    }
    catch (ex) {
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
async function postAJson(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    let aJson;
    try {
        // prin POST raspunsul vine in corpul request-ului 'req.body'
        aJson = await jsonService.saveAJson(req.em, req.body);
    }
    catch (ex) {
        return next(ex);
    }
    // daca a aparut o eroare, mergem cu aceasta eroare la urmatorul middleware
    if (aJson instanceof Error) {
        log_1.log(`(a-json.route.ts) error: ${aJson.message}`);
        return next(aJson);
    }
    // daca nu a aparut o eroare, intoarcem status code 201 => CREATED
    // de asemenea, intoarcem fisierul JSON rezultat
    return res.status(201).json(aJson);
}
//# sourceMappingURL=a-json.route.js.map