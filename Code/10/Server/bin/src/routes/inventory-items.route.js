"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInventoryItemRoute = void 0;
const mikro_orm_1 = require("mikro-orm");
const inventoryItemService = require("../services/inventory-item.service");
function setInventoryItemRoute(router) {
    router.get('/', getInventoryItems);
    router.get('/:id', getInventoryItem);
    router.post('/', postInventoryItem);
    router.put('/:id', putInventoryItem);
    router.delete('/:id', removeInventoryItem);
    return router;
}
exports.setInventoryItemRoute = setInventoryItemRoute;
// GET
async function getInventoryItems(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('inventory-item.route.ts, getInventoryItems():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('inventory-item.route.ts, getInventoryItems()^');
    console.log('');
    let inventoryItems;
    let count = 0;
    const page = req.query.pageNumber
        ? parseInt(req.query.pageNumber.toString())
        : 1;
    const limit = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 5;
    const sort = req.query.sort ? req.query.sort.toString() : '';
    const active = req.query.activeOnly === 'true'; // "true" doar daca exista "activeOnly" si are valoarea "true"
    console.log('');
    try {
        [inventoryItems, count] = await Promise.all([
            inventoryItemService.getInventoryItems(req.em, page, limit, sort, active),
            inventoryItemService.countInventoryItems(req.em, active),
        ]);
    }
    catch (ex) {
        return next(ex);
    }
    if (inventoryItems instanceof Error) {
        return next(inventoryItems);
    }
    return res.header('X-Count', count.toString()).json(inventoryItems);
}
// GET:id
async function getInventoryItem(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('inventory-item.route.ts, getInventoryItem():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('inventory-item.route.ts, getInventoryItem()^');
    console.log('');
    let inventoryItem;
    try {
        inventoryItem = await inventoryItemService.getInventoryItem(req.em, req.params.id);
    }
    catch (ex) {
        return next(ex);
    }
    if (inventoryItem instanceof Error) {
        return next(inventoryItem);
    }
    if (inventoryItem === null) {
        return res.status(404).end();
    }
    return res.json(inventoryItem);
}
// DELETE
async function removeInventoryItem(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('inventory-item.route.ts, removeInventoryItem():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('inventory-item.route.ts, removeInventoryItem()^');
    console.log('');
    try {
        await inventoryItemService.removeInventoryItem(req.em, req.params.id);
    }
    catch (ex) {
        return next(ex);
    }
    return res.status(200).end();
}
// POST
async function postInventoryItem(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('inventory-item.route.ts, postInventoryItem():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('inventory-item.route.ts, postInventoryItem()^');
    console.log('');
    let inventoryItem;
    try {
        inventoryItem = await inventoryItemService.addInventoryItem(req.em, req.body);
    }
    catch (ex) {
        return next(ex);
    }
    if (inventoryItem instanceof Error) {
        return next(inventoryItem);
    }
    return res.status(201).json(inventoryItem);
}
// PUT
async function putInventoryItem(req, res, next) {
    if (!req.em || !(req.em instanceof mikro_orm_1.EntityManager)) {
        return next(Error('EntityManager not available'));
    }
    console.log('');
    console.log('inventory-item.route.ts, putInventoryItem():');
    console.log('req.baseUrl:', req.baseUrl);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('inventory-item.route.ts, putInventoryItem()^');
    let inventoryItem;
    try {
        inventoryItem = await inventoryItemService.updateInventoryItem(req.em, req.body, req.params.id);
        console.log('inventoryItem:', inventoryItem);
        console.log('');
    }
    catch (ex) {
        return next(ex);
    }
    if (inventoryItem instanceof Error) {
        return next(inventoryItem);
    }
    return res.status(200).json(inventoryItem);
}
//# sourceMappingURL=inventory-items.route.js.map