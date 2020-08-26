import { Address } from './address.model';

export interface IWarehouse {
	info: String;
	phone: String;
	openDays: String;
	schedule: String;
	address: Address
}

export class Warehouse implements IWarehouse {

	info: String;
	phone: String;
	openDays: String;
	schedule: String;
	address: Address;

	constructor({ info, phone, openDays, schedule, address }:
		{ info: String, phone: String, openDays: String, schedule: String, address: Address }) {
		this.info = info;
		this.phone = phone;
		this.openDays = openDays;
		this.schedule = schedule;
		this.address = address
	}

	toString() {
		return `${this.info} ${this.phone} ${this.openDays} ${this.schedule} ${this.address}`;
	}
}