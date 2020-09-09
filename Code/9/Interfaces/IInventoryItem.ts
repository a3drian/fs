export interface IInventoryItem {
	id: string;
	name: string;
	user: string;
	location: string;
	inventoryNumber: number;
	description: string;
	createdAt: Date;
	modifiedAt: Date;
	active: boolean;
}
