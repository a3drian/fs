import { Injectable, OnInit } from '@angular/core';
import { IWarehouse } from './warehouse.model';
import { Address } from './address.model';

@Injectable({
	providedIn: 'root'
})

export class WarehouseService implements OnInit {

	warehouses: IWarehouse[] = [
		<IWarehouse>{
			info: 'Secure Self Storage Basildon',
			phone: '01268 282 148',
			openDays: '7 days a week',
			schedule: '24hrs',
			// address: new Address('Unit 1, Festival Leisure Park', 'Carnival Close',	'Basildon',	'Essex', 'SS14 3WN') // with commented constructor
			address: new Address({
				line1: 'Unit 1, Festival Leisure Park',
				line2: 'Carnival Close',
				town: 'Basildon',
				county: 'Essex',
				postcode: 'SS14 3WN'
			})
		},
		<IWarehouse>{
			info: 'Self Storage Cambridge',
			phone: '01223 241 184',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: '505 Coldhams Lane',
				town: 'Cambridge',
				county: 'Cambridgeshire',
				postcode: 'CB1 3JS'
			})
		},
		<IWarehouse>{
			info: 'Self Storage Dartford',
			phone: '01322 628 203',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: '599-613 Princes Road',
				town: 'Dartford',
				county: 'Kent',
				postcode: 'DA2 6HH'
			})
		},
	]

	GetWarehouses(): IWarehouse[] {
		return this.warehouses;
	}

	constructor() { console.log('constructor(): WarehouseService') }

	ngOnInit(): void {
		console.log('ngOnInit(): WarehouseService');
	}

}