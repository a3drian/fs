import { IInventoryItemOld } from './inventory-item.model';

export class Laptop implements IInventoryItemOld {
	id: String;
	owner: String;
	model: String;
	serialNumber: String;

	constructor({ id, owner, model, serialNumber }:
		{ id: String, owner: String, model: String, serialNumber: String }) {
		this.id = id;
		this.owner = owner;
		this.model = model;
		this.serialNumber = serialNumber;
	}
}