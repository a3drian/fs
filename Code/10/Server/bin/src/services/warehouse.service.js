"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWarehouses = exports.removeWarehouse = exports.addWarehouse = exports.updateWarehouse = exports.getWarehouse = exports.getWarehouses = void 0;
const warehouse_entity_1 = require("../entities/warehouse.entity");
const mikro_orm_1 = require("mikro-orm");
async function countWarehouses(em, activeOnly = false) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    try {
        const count = await em.count(warehouse_entity_1.Warehouse, activeOnly ? { active: true } : {});
        return count;
    }
    catch (ex) {
        return ex;
    }
}
exports.countWarehouses = countWarehouses;
async function getWarehouses(em, page, limit, sort, activeOnly) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    let sorting = {};
    if (sort) {
        const sortParams = sort.split('_');
        const column = sortParams[0];
        const order = sortParams[1];
        console.log('sortParams:', sortParams);
        console.log('column:', column);
        console.log('order:', order);
        if (column && order) {
            sorting[column] = order === 'desc' ? mikro_orm_1.QueryOrder.DESC : mikro_orm_1.QueryOrder.ASC;
            console.log('sorting:', sorting);
        }
        else {
            return Error('invalid params');
        }
    }
    try {
        console.log('activeOnly:', activeOnly);
        const items = await em.find(warehouse_entity_1.Warehouse, activeOnly ? { active: true } : {}, {
            orderBy: sorting,
            limit: limit,
            offset: (page - 1) * limit,
        });
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
        console.log('');
        console.log('warehouse.service.ts, getWarehouses():');
        // console.log(items);
        // items.forEach(item => {
        // 	console.log(item.active);
        // });
        console.log('items.length:', items.length);
        console.log('warehouse.service.ts, getWarehouses()^');
        return items;
    }
    catch (ex) {
        return ex;
    }
}
exports.getWarehouses = getWarehouses;
async function getWarehouse(em, id) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    if (!id || typeof id !== 'string') {
        return Error('invalid params');
    }
    console.log('');
    console.log('warehouse.service.ts, getWarehouse():');
    console.log('id:', id);
    try {
        const item = await em.findOne(warehouse_entity_1.Warehouse, { id: id });
        console.log('item:', item);
        console.log('warehouse.service.ts, getWarehouse()^');
        console.log('');
        return item;
    }
    catch (ex) {
        return ex;
    }
}
exports.getWarehouse = getWarehouse;
async function removeWarehouse(em, id) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    if (!id || typeof id !== 'string') {
        return Error('invalid params');
    }
    try {
        const item = await em.findOneOrFail(warehouse_entity_1.Warehouse, { id: id });
        await em.removeAndFlush(item);
    }
    catch (ex) {
        return ex;
    }
}
exports.removeWarehouse = removeWarehouse;
async function updateWarehouse(em, warehouse, id) {
    if (!(em instanceof mikro_orm_1.EntityManager))
        return Error('invalid request');
    if (!warehouse ||
        typeof warehouse !== 'object' ||
        !warehouse.id ||
        id !== warehouse.id) {
        return Error('invalid params');
    }
    try {
        const item = await em.findOneOrFail(warehouse_entity_1.Warehouse, {
            id: warehouse.id,
        });
        mikro_orm_1.wrap(item).assign(warehouse); // se aplica modificarile asupra lui 'item', folosind obiectul primit ca parametru - 'warehouse'
        await em.persistAndFlush(item); // se salveaza modificarile
        return item;
    }
    catch (ex) {
        return ex;
    }
}
exports.updateWarehouse = updateWarehouse;
async function addWarehouse(em, warehouse) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    if (!warehouse || typeof warehouse !== 'object' || warehouse.id) {
        return Error('invalid params');
    }
    try {
        const item = new warehouse_entity_1.Warehouse(warehouse);
        console.log('');
        console.log('warehouse.service.ts, addWarehouse():');
        console.log('item:', item);
        console.log('');
        console.log('warehouse.service.ts, addWarehouse()^');
        await em.persistAndFlush(item);
        return item;
    }
    catch (ex) {
        return ex;
    }
}
exports.addWarehouse = addWarehouse;
//# sourceMappingURL=warehouse.service.js.map