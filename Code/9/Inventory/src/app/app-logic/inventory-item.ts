import { IInventoryItem } from 'inventory-interfaces/IInventoryItem';

export class InventoryItem implements IInventoryItem {

	id: string;
	name: string;
	user: string;
	location: string;
	inventoryNumber: number;
	description: string;
	createdAt: Date;
	modifiedAt: Date;
	active: boolean;

	constructor({ id, name, user, location, inventoryNumber, description, createdAt, modifiedAt, active });
	constructor({ id, name, user, location, inventoryNumber, description, createdAt, modifiedAt, active }:
		{
			id: string,
			name: string,
			user: string,
			location: string,
			inventoryNumber: number,
			description: string,
			createdAt: Date,
			modifiedAt: Date,
			active: boolean
		}) {
		this.id = id;
		this.name = name;
		this.user = user;
		this.location = location;
		this.description = description;
		this.inventoryNumber = inventoryNumber;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.active = active;
	}

	// public constructor(init?: Partial<InventoryItem>) {
	// 	Object.assign(this, init);
	// 	this.createdAt = init ? new Date(this.createdAt) : new Date();
	// 	this.modifiedAt = new Date(this.modifiedAt);
	// }

}
