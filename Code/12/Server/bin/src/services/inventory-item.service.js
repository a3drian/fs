"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countInventoryItems = exports.removeInventoryItem = exports.addInventoryItem = exports.updateInventoryItem = exports.getInventoryItem = exports.getInventoryItems = void 0;
const inventory_item_entity_1 = require("../entities/inventory-item.entity");
const mikro_orm_1 = require("mikro-orm");
async function countInventoryItems(em, activeOnly = false, name = '') {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    const filter = {};
    if (activeOnly) {
        filter.active = true;
    }
    if (name) {
        filter.name = name;
    }
    console.log('');
    console.log('inventory-item.service.ts, countInventoryItems():');
    console.log('filter:', filter);
    try {
        const count = await em.count(inventory_item_entity_1.InventoryItem, 
        // activeOnly ? { active: true } : {}
        filter);
        console.log('count:', count);
        console.log('inventory-item.service.ts, countInventoryItems()^');
        console.log('');
        return count;
    }
    catch (ex) {
        return ex;
    }
}
exports.countInventoryItems = countInventoryItems;
async function getInventoryItems(em, page, limit, sort, activeOnly, name) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    const sorting = {};
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
    console.log('page:', page);
    console.log('limit:', limit);
    console.log('sort:', sort);
    console.log('activeOnly:', activeOnly);
    console.log('name:', name);
    const options = {
        orderBy: sorting,
        limit: limit,
        offset: (page - 1) * limit,
    };
    const filter = {};
    if (activeOnly) {
        filter.active = true;
    }
    if (name) {
        filter.name = name;
    }
    console.log('filter:', filter);
    try {
        const items = await em.find(inventory_item_entity_1.InventoryItem, filter, options);
        await new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
        // console.log('items:', items);
        console.log('');
        console.log('inventory-item.service.ts, getInventoryItems():');
        // console.log(items);
        // items.forEach(item => {
        // 	console.log(item.active);
        // });
        console.log('items.length:', items.length);
        console.log('inventory-item.service.ts, getInventoryItems()^');
        return items;
    }
    catch (ex) {
        return ex;
    }
}
exports.getInventoryItems = getInventoryItems;
async function getInventoryItem(em, id) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    if (!id || typeof id !== 'string') {
        return Error('invalid params');
    }
    console.log('');
    console.log('inventory-item.service.ts, getInventoryItem():');
    console.log('id:', id);
    try {
        const item = await em.findOne(inventory_item_entity_1.InventoryItem, { id: id });
        console.log('item:', item);
        console.log('inventory-item.service.ts, getInventoryItem()^');
        console.log('');
        return item;
    }
    catch (ex) {
        return ex;
    }
}
exports.getInventoryItem = getInventoryItem;
async function removeInventoryItem(em, id) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    if (!id || typeof id !== 'string') {
        return Error('invalid params');
    }
    try {
        const item = await em.findOneOrFail(inventory_item_entity_1.InventoryItem, { id: id });
        await em.removeAndFlush(item);
    }
    catch (ex) {
        return ex;
    }
}
exports.removeInventoryItem = removeInventoryItem;
async function updateInventoryItem(em, inventoryItem, id) {
    if (!(em instanceof mikro_orm_1.EntityManager))
        return Error('invalid request');
    if (!inventoryItem ||
        typeof inventoryItem !== 'object' ||
        !inventoryItem.id ||
        id !== inventoryItem.id) {
        return Error('invalid params');
    }
    try {
        const item = await em.findOneOrFail(inventory_item_entity_1.InventoryItem, {
            id: inventoryItem.id,
        });
        mikro_orm_1.wrap(item).assign(inventoryItem); // se aplica modificarile asupra lui 'item', folosind obiectul primit ca parametru - 'inventoryItem'
        await em.persistAndFlush(item); // se salveaza modificarile
        return item;
    }
    catch (ex) {
        return ex;
    }
}
exports.updateInventoryItem = updateInventoryItem;
async function addInventoryItem(em, inventoryItem) {
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    if (!inventoryItem || typeof inventoryItem !== 'object' || inventoryItem.id) {
        return Error('invalid params');
    }
    try {
        const item = new inventory_item_entity_1.InventoryItem(inventoryItem);
        console.log('');
        console.log('inventory-item.service.ts, addInventoryItem():');
        console.log('item:', item);
        console.log('');
        console.log('inventory-item.service.ts, addInventoryItem()^');
        await em.persistAndFlush(item);
        return item;
    }
    catch (ex) {
        return ex;
    }
}
exports.addInventoryItem = addInventoryItem;
//# sourceMappingURL=inventory-item.service.js.map