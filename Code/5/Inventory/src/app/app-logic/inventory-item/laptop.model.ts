import { IInventoryItem } from './inventory-item.model';

export class Laptop implements IInventoryItem {
	id: String;
	owner: String;
	model: String;
	sn: String;
}