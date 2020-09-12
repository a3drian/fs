import { Warehouse } from '../entities/warehouse.entity';
import { EntityManager, QueryOrderMap, QueryOrder, wrap } from 'mikro-orm';

export {
	getWarehouses,
	getWarehouse,
	updateWarehouse,
	addWarehouse,
	removeWarehouse,
	countWarehouses
};

async function countWarehouses(
	em: EntityManager,
	activeOnly: boolean = false
) {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	try {
		const count = await em.count(
			Warehouse,
			activeOnly ? { active: true } : {}
		);
		return count;
	} catch (ex) {
		return ex;
	}
}

async function getWarehouses(
	em: EntityManager,
	page: number,
	limit: number,
	sort: string,
	activeOnly: boolean,
): Promise<Error | Warehouse[]> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	let sorting: QueryOrderMap = {};
	if (sort) {

		const sortParams = sort.split('_');
		const column = sortParams[0];
		const order = sortParams[1];

		console.log('sortParams:', sortParams);
		console.log('column:', column);
		console.log('order:', order);

		if (column && order) {
			sorting[column] = order === 'desc' ? QueryOrder.DESC : QueryOrder.ASC;
			console.log('sorting:', sorting);
		} else {
			return Error('invalid params');
		}
	}

	try {
		console.log('activeOnly:', activeOnly);

		const items = await em.find(
			Warehouse,
			activeOnly ? { active: true } : {},
			{
				orderBy: sorting,
				limit: limit,
				offset: (page - 1) * limit,	// daca dorim pagina 1 cu 5 elemente => offset = 0, daca dormi pagina 2 => offset = 5, samd
			}
		);
		await new Promise(
			(resolve) => {
				setTimeout(resolve, 500)
			}
		);

		console.log('');
		console.log('warehouse.service.ts, getWarehouses():');
		// console.log(items);
		// items.forEach(item => {
		// 	console.log(item.active);
		// });
		console.log('items.length:', items.length);
		console.log('warehouse.service.ts, getWarehouses()^');

		return items;
	} catch (ex) {
		return ex;
	}
}

async function getWarehouse(
	em: EntityManager,
	id: string
): Promise<Error | Warehouse | null> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	if (!id || typeof id !== 'string') {
		return Error('invalid params');
	}

	console.log('');
	console.log('warehouse.service.ts, getWarehouse():');
	console.log('id:', id);

	try {
		const item = await em.findOne(Warehouse, { id: id });
		console.log('item:', item);
		console.log('warehouse.service.ts, getWarehouse()^');
		console.log('');
		return item;
	} catch (ex) {
		return ex;
	}
}

async function removeWarehouse(
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
		const item = await em.findOneOrFail(Warehouse, { id: id });
		await em.removeAndFlush(item);
	} catch (ex) {
		return ex;
	}
}

async function updateWarehouse(
	em: EntityManager,
	warehouse: Partial<Warehouse>,
	id: string
): Promise<Error | Warehouse> {
	if (!(em instanceof EntityManager)) return Error('invalid request');

	if (
		!warehouse ||
		typeof warehouse !== 'object' ||
		!warehouse.id ||
		id !== warehouse.id
	) {
		return Error('invalid params');
	}

	try {
		const item = await em.findOneOrFail(Warehouse,
			{
				id: warehouse.id,
			}
		);
		wrap(item).assign(warehouse);	// se aplica modificarile asupra lui 'item', folosind obiectul primit ca parametru - 'warehouse'
		await em.persistAndFlush(item);	// se salveaza modificarile
		return item;
	} catch (ex) {
		return ex;
	}
}

async function addWarehouse(
	em: EntityManager,
	warehouse: Partial<Warehouse>
): Promise<Error | Warehouse> {
	if (!(em instanceof EntityManager)) {
		return Error('invalid request');
	}

	if (!warehouse || typeof warehouse !== 'object' || warehouse.id) {
		return Error('invalid params');
	}

	try {
		const item = new Warehouse(warehouse);

		console.log('');
		console.log('warehouse.service.ts, addWarehouse():');
		console.log('item:', item);
		console.log('');
		console.log('warehouse.service.ts, addWarehouse()^');

		await em.persistAndFlush(item);
		return item;
	} catch (ex) {
		return ex;
	}
}