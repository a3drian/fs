import { InventoryItem } from '../entities/inventory-item.entity';
import { EntityManager, wrap } from 'mikro-orm';

export {
	getInventoryItems,
	getInventoryItem,
	updateInventoryItem,
	addInventoryItem,
	removeInventoryItem,
	countInventoryItems
};

async function countInventoryItems(
	em: EntityManager,
	activeOnly: boolean = false
) {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	try {
		const count = await em.count(InventoryItem, activeOnly ? { active: true } : {});
		return count;
	} catch (ex) {
		return ex;
	}
}

async function getInventoryItems(
	em: EntityManager,
	page: number,
	limit: number,
	activeOnly: boolean,
): Promise<Error | InventoryItem[]> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	try {
		console.log('activeOnly:', activeOnly);
		const items = await em.find(
			InventoryItem,
			activeOnly ? { active: true } : {},
			{ limit: limit, offset: (page - 1) * limit }
		);
		console.log('service.ts, getInventoryItems():');
		// console.log(items);
		items.forEach(item => {
			console.log(item.active);
		});
		console.log(items.length);
		console.log('service.ts, getInventoryItems()^');
		return items;
	} catch (ex) {
		return ex;
	}
}

async function getInventoryItem(
	em: EntityManager,
	id: string
): Promise<Error | InventoryItem | null> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	if (!id || typeof id !== 'string') {
		return Error('invalid params');
	}

	try {
		const item = await em.findOne(InventoryItem, { id: id });
		return item;
	} catch (ex) {
		return ex;
	}
}

async function removeInventoryItem(
	em: EntityManager,
	id: string
): Promise<Error | void> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	if (!id || typeof id !== 'string') {
		return Error('invalid params');
	}

	try {
		const item = await em.findOneOrFail(InventoryItem, { id: id });
		await em.removeAndFlush(item);
	} catch (ex) {
		return ex;
	}
}

async function updateInventoryItem(
	em: EntityManager,
	inventoryItem: Partial<InventoryItem>
): Promise<Error | InventoryItem> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	if (!inventoryItem || typeof inventoryItem !== 'object' || !inventoryItem.id) {
		return Error('invalid params');
	}

	try {
		const item = await em.findOneOrFail(InventoryItem, {
			id: inventoryItem.id,
		});
		wrap(item).assign(inventoryItem);
		await em.persistAndFlush(item);
		return item;
	} catch (ex) {
		return ex;
	}
}

async function addInventoryItem(
	em: EntityManager,
	inventoryItem: Partial<InventoryItem>
): Promise<Error | InventoryItem> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	if (!inventoryItem || typeof inventoryItem !== 'object' || inventoryItem.id) {
		return Error('invalid params');
	}
	
	try {
		const item = new InventoryItem(inventoryItem);
		console.log('item:', item);
		await em.persistAndFlush(item);
		return item;
	} catch (ex) {
		return ex;
	}
}
