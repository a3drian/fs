import { IInventoryItem } from './inventory-item.model';

export class Phone implements IInventoryItem {
	id: String;
	owner: String;
	model: String;
	serialNumber: String;
	provider: String;
	onContract: boolean;

	constructor({ id, owner, model, serialNumber, provider, onContract }:
		{ id: String, owner: String, model: String, serialNumber: String, provider: String, onContract: boolean }) {
		this.id = id;
		this.owner = owner;
		this.model = model;
		this.serialNumber = serialNumber;
		this.provider = provider;
		this.onContract = onContract;
	}
}