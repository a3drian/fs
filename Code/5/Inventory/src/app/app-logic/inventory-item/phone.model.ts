import { IInventoryItem } from './inventory-item.model';

export class Phone implements IInventoryItem {
	id: String;
	owner: String;
	model: String;
	sn: String;
	provider: String;
	onContract: boolean;
}