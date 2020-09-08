import { Address } from './address.model';

export interface IWarehouse {
	info: string;
	phone: string;
	openDays: string;
	schedule: string;
	address: Address;
}

export class Warehouse implements IWarehouse {

	info: string;
	phone: string;
	openDays: string;
	schedule: string;
	address: Address;

	constructor({ info, phone, openDays, schedule, address }:
		{ info: string, phone: string, openDays: string, schedule: string, address: Address }) {
		this.info = info;
		this.phone = phone;
		this.openDays = openDays;
		this.schedule = schedule;
		this.address = address;
	}

	tostring(): string {
		return `${this.info} ${this.phone} ${this.openDays} ${this.schedule} ${this.address}`;
	}
}
