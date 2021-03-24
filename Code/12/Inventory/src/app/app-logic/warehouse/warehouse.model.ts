import { IAddress } from 'inventory-interfaces/IAddress';
import { IWarehouse } from 'inventory-interfaces/IWarehouse';

export class Warehouse implements IWarehouse {

	id: string;
	info: string;
	phone: string;
	openDays: string;
	schedule: string;
	address: IAddress;
	active: boolean;

	public constructor(init?: Partial<IWarehouse>) {
		Object.assign(this, init);
	}

	tostring(): string {
		return `${this.info} ${this.phone} ${this.openDays} ${this.schedule} ${this.address}`;
	}
}
