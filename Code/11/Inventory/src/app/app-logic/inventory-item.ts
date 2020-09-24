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

	public constructor(init?: Partial<InventoryItem>) {
		Object.assign(this, init);
		this.createdAt = init ? new Date(this.createdAt) : new Date();
		this.modifiedAt = new Date(this.modifiedAt);
	}

}
