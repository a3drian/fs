import { Router, Response, NextFunction } from 'express';
import { EntityManager } from 'mikro-orm';
import { InventoryItem } from '../entities/inventory-item.entity';
import { IExpressRequest } from '../interfaces/IExpressRequest';
import * as inventoryItemService from '../services/inventory-item.service';

export { setInventoryItemRoute };

function setInventoryItemRoute(router: Router): Router {
	router.get('/', getInventoryItems);
	router.get('/:id', getInventoryItem);
	router.post('/', postInventoryItem);
	router.put('/', putInventoryItem);
	router.delete('/:id', removeInventoryItem);

	return router;
}

// GET
async function getInventoryItems(
	req: IExpressRequest,
	res: Response,
	next: NextFunction
) {
	if (!req.em || !(req.em instanceof EntityManager)) {
		return next(Error('EntityManager not available'));
	}

	// console.log('');
	// console.log('inventory-item.route.ts, getInventoryItems():');
	// console.log('req.baseUrl:', req.baseUrl);
	// console.log('req.originalUrl:', req.originalUrl);
	// console.log('inventory-item.route.ts, getInventoryItems()^');
	// console.log('');

	let inventoryItems: Error | InventoryItem[] | null;
	let count = 0;

	let page = req.query.pageNumber
		? parseInt(req.query.pageNumber.toString())
		: 1;
	// let limit = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 5;
	let limit = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : 100;
	let active = req.query.activeOnly ? true : false;
	try {
		[inventoryItems, count] = await Promise.all([
			inventoryItemService.getInventoryItems(req.em, page, limit, active),
			inventoryItemService.countInventoryItems(req.em, active),
		]);
	} catch (ex) {
		return next(ex);
	}

	if (inventoryItems instanceof Error) {
		return next(inventoryItems);
	}

	return res.header('X-Count', count.toString()).json(inventoryItems);
}

// GET:id
async function getInventoryItem(
	req: IExpressRequest,
	res: Response,
	next: NextFunction
) {
	if (!req.em || !(req.em instanceof EntityManager)) {
		return next(Error('EntityManager not available'));
	}

	console.log('');
	console.log('inventory-item.route.ts, getInventoryItem():');
	console.log('req.baseUrl:', req.baseUrl);
	console.log('req.originalUrl:', req.originalUrl);
	console.log('inventory-item.route.ts, getInventoryItem()^');
	console.log('');

	let inventoryItem: Error | InventoryItem | null;
	try {
		inventoryItem = await inventoryItemService.getInventoryItem(
			req.em,
			req.params.id
		);
	} catch (ex) {
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
async function removeInventoryItem(
	req: IExpressRequest,
	res: Response,
	next: NextFunction
) {
	if (!req.em || !(req.em instanceof EntityManager)) {
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
	} catch (ex) {
		return next(ex);
	}

	return res.status(200).end();
}

// POST
async function postInventoryItem(
	req: IExpressRequest,
	res: Response,
	next: NextFunction
) {
	if (!req.em || !(req.em instanceof EntityManager)) {
		return next(Error('EntityManager not available'));
	}

	console.log('');
	console.log('inventory-item.route.ts, postInventoryItem():');
	console.log('req.baseUrl:', req.baseUrl);
	console.log('req.originalUrl:', req.originalUrl);
	console.log('inventory-item.route.ts, postInventoryItem()^');
	console.log('');

	let inventoryItem: Error | InventoryItem;
	try {
		inventoryItem = await inventoryItemService.addInventoryItem(
			req.em,
			req.body
		);
	} catch (ex) {
		return next(ex);
	}

	if (inventoryItem instanceof Error) {
		return next(inventoryItem);
	}

	return res.status(201).json(inventoryItem);
}

// PUT
async function putInventoryItem(
	req: IExpressRequest,
	res: Response,
	next: NextFunction
) {
	if (!req.em || !(req.em instanceof EntityManager)) {
		return next(Error('EntityManager not available'));
	}

	console.log('');
	console.log('inventory-item.route.ts, putInventoryItem():');
	console.log('req.baseUrl:', req.baseUrl);
	console.log('req.originalUrl:', req.originalUrl);
	console.log('inventory-item.route.ts, putInventoryItem()^');

	let inventoryItem: Error | InventoryItem;
	try {

		inventoryItem = await inventoryItemService.updateInventoryItem(
			req.em,
			req.body
		);

		console.log('inventoryItem:', inventoryItem);
		console.log('');

	} catch (ex) {
		return next(ex);
	}

	if (inventoryItem instanceof Error) {
		return next(inventoryItem);
	}

	return res.status(200).json(inventoryItem);
}