import { IAddress } from './IAddress';

export interface IWarehouse {
	id: string;
	info: string;
	phone: string;
	openDays: string;
	schedule: string;
	address: IAddress;
	active: boolean;
}
