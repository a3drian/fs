export interface OldIInventoryItem {
	id: number;
	name: String;
	user: String;
	location: String;
	inventoryNumber: number;
	description: String;
	createdAt: Date;
	modifiedAt: Date;
	deleted: boolean;
}

export class OldInventoryItem implements OldIInventoryItem {

	id: number;
	name: String;
	user: String;
	location: String;
	inventoryNumber: number;
	description: String;
	createdAt: Date;
	modifiedAt: Date;
	deleted: boolean;

	constructor({ id, name, user, location, inventoryNumber, description, createdAt, modifiedAt, deleted });
	constructor({ id, name, user, location, inventoryNumber, description, createdAt, modifiedAt, deleted }:
		{
			id: number,
			name: String,
			user: String,
			location: String,
			inventoryNumber: number,
			description: String,
			createdAt: Date,
			modifiedAt: Date,
			deleted: boolean
		}) {
		this.id = id;
		this.name = name;
		this.user = user;
		this.location = location;
		this.inventoryNumber = inventoryNumber;
		this.description = description;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.deleted = deleted;
	}

}

export interface IInventoryItem {
	id: String;
	name: String;
	user: String;
	location: String;
	inventoryNumber: number;
	description: String;
	createdAt: Date;
	modifiedAt: Date;
	deleted: boolean;
	active: boolean;
}

export class InventoryItem implements IInventoryItem {

	id: String;
	name: String;
	user: String;
	location: String;
	inventoryNumber: number;
	description: String;
	createdAt: Date;
	modifiedAt: Date;
	deleted: boolean;
	active: boolean;

	constructor({ id, name, user, location, inventoryNumber, description, createdAt, modifiedAt, deleted, active });
	constructor({ id, name, user, location, inventoryNumber, description, createdAt, modifiedAt, deleted, active }:
		{
			id: String,
			name: String,
			user: String,
			location: String,
			inventoryNumber: number,
			description: String,
			createdAt: Date,
			modifiedAt: Date,
			deleted: boolean
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
		this.deleted = deleted;
		this.active = active;
	}

}