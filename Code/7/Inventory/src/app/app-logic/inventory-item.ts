export interface IInventoryItem {
	id: number;
	name: String;
	user: String;
	location: String;
	description: String;
	inventoryNumber: number;
	createdAt: Date;
	modifiedAt: Date;
	deleted: boolean;
}

export class InventoryItem implements IInventoryItem {

	id: number;
	name: String;
	user: String;
	location: String;
	description: String;
	inventoryNumber: number;
	createdAt: Date;
	modifiedAt: Date;
	deleted: boolean;

	constructor({ id, name, user, location, description, inventoryNumber, createdAt, modifiedAt, deleted });
	constructor(init?: Partial<IInventoryItem>);

	// constructor({ id, name, user, location, description, inventoryNumber, createdAt, modifiedAt, deleted }:
	// 	{
	// 		id: number,
	// 		name: String,
	// 		user: String,
	// 		location: String,
	// 		description: String,
	// 		inventoryNumber: number,
	// 		createdAt: Date,
	// 		modifiedAt: Date,
	// 		deleted: boolean
	// 	}) {
	// 	this.id = id;
	// 	this.name = name;
	// 	this.user = user;
	// 	this.location = location;
	// 	this.description = description;
	// 	this.inventoryNumber = inventoryNumber;
	// 	this.createdAt = createdAt;
	// 	this.modifiedAt = modifiedAt;
	// 	this.deleted = deleted;
	// }

	constructor(partial?: Partial<IInventoryItem>) {
		console.log('constructor(partial?: Partial<IInventoryItem>):');
		console.log(partial);

		// const init = new InventoryItem({
		// 	name: partial.name,
		// 	user: partial.user,
		// 	description: partial.description,
		// 	location: partial.location,
		// 	inventoryNumber: partial.inventoryNumber,
		// 	createdAt: new Date(partial.createdAt),
		// });

		Object.assign(this, partial);
	}

}