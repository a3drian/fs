"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWarehouseRoute = void 0;
const mikro_orm_1 = require("mikro-orm");
const warehouseService = require("../services/warehouse.service");
function setWarehouseRoute(router) {
    router.get('/', getWarehouses);
    router.get('/:id', getWarehouse);
    router.post('/', postWarehouse);
    router.put('/:id', putWarehouse);
    router.delete('/:id', removeWarehouse);
    return router;
}
exports.setWarehouseRoute = setWarehouseRoute;
// GET
async function getWarehouses(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('warehouse.route.ts, getWarehouses():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('warehouse.route.ts, getWarehouses()^');
    console.log('');
    let warehouses;
    let count = 0;
    const page = req.query.pageNumber
        ? parseInt(req.query.pageNumber.toString())
        : 1;
    const limit = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 5;
    const sort = req.query.sort ? req.query.sort.toString() : '';
    const active = req.query.activeOnly === 'true'; // "true" doar daca exista "activeOnly" si are valoarea "true"
    console.log('');
    try {
        [warehouses, count] = await Promise.all([
            warehouseService.getWarehouses(req.em, page, limit, sort, active),
            warehouseService.countWarehouses(req.em, active),
        ]);
    }
    catch (ex) {
        return next(ex);
    }
    if (warehouses instanceof Error) {
        return next(warehouses);
    }
    return res.header('X-Count', count.toString()).json(warehouses);
}
// GET:id
async function getWarehouse(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('warehouse.route.ts, getWarehouse():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('warehouse.route.ts, getWarehouse()^');
    console.log('');
    let warehouse;
    try {
        warehouse = await warehouseService.getWarehouse(req.em, req.params.id);
    }
    catch (ex) {
        return next(ex);
    }
    if (warehouse instanceof Error) {
        return next(warehouse);
    }
    if (warehouse === null) {
        return res.status(404).end();
    }
    return res.json(warehouse);
}
// DELETE
async function removeWarehouse(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('warehouse.route.ts, removeWarehouse():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('warehouse.route.ts, removeWarehouse()^');
    console.log('');
    try {
        await warehouseService.removeWarehouse(req.em, req.params.id);
    }
    catch (ex) {
        return next(ex);
    }
    return res.status(200).end();
}
// POST
async function postWarehouse(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('warehouse.route.ts, postWarehouse():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('warehouse.route.ts, postWarehouse()^');
    console.log('');
    let warehouse;
    try {
        warehouse = await warehouseService.addWarehouse(req.em, req.body);
    }
    catch (ex) {
        return next(ex);
    }
    if (warehouse instanceof Error) {
        return next(warehouse);
    }
    return res.status(201).json(warehouse);
}
// PUT
async function putWarehouse(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('warehouse.route.ts, putWarehouse():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('warehouse.route.ts, putWarehouse()^');
    let warehouse;
    try {
        warehouse = await warehouseService.updateWarehouse(req.em, req.body, req.params.id);
        console.log('warehouse:', warehouse);
        console.log('');
    }
    catch (ex) {
        return next(ex);
    }
    if (warehouse instanceof Error) {
        return next(warehouse);
    }
    return res.status(200).json(warehouse);
}
//# sourceMappingURL=warehouses.route.js.map