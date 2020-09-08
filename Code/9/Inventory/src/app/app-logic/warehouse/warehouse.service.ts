import { Injectable, OnInit } from '@angular/core';
import { IWarehouse, Warehouse } from './warehouse.model';
import { Address } from './address.model';

@Injectable({
	providedIn: 'root'
})

export class WarehouseService {

	warehouses: IWarehouse[] = [
		new Warehouse({
			info: 'Self Storage Basildon',
			phone: '01268 282 148',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: 'Unit 1, Festival Leisure Park',
				line2: 'Carnival Close',
				town: 'Basildon',
				county: 'Essex',
				postcode: 'SS14 3WN'
			})
		}),
		new Warehouse({
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
		}),
		new Warehouse({
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
		}),
		new Warehouse({
			info: 'Self Storage Aylesford and Maidstone',
			phone: '01622 715 398',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: 'Units 2&3',
				line2: '3 Bellingham Way',
				town: 'Aylesford',
				county: 'Kent',
				postcode: 'ME20 7HP'
			})
		}),
		new Warehouse({
			info: 'Self Storage Bradford',
			phone: '01234 346 418',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: 'Unit 2',
				line2: 'Caxton Road',
				town: 'Bedford',
				county: 'Bedford',
				postcode: 'MK41 0LF'
			})
		}),
		new Warehouse({
			info: 'Self Storage Gloucester',
			phone: '01452 502 666',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: '3 Barnwood Point',
				line2: 'Corinium Avenue',
				town: 'Gloucester',
				county: 'Gloucestershire',
				postcode: 'GL4 3HX'
			})
		}),
		new Warehouse({
			info: 'Self Storage Wycombe Central',
			phone: '01494 449 528',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: 'Albany House',
				line2: 'Leigh Street',
				town: 'High Wycombe',
				county: 'Buckinghamshire',
				postcode: 'HP11 2QU'
			})
		}),
		new Warehouse({
			info: 'Self Storage West Bromwich',
			phone: '0121 580 0100',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: '133 Birmingham Road',
				town: 'West Bromwich',
				county: 'Birmingham',
				postcode: 'B71 4JZ'
			})
		}),
		new Warehouse({
			info: 'Self Storage Dunstable & Luton',
			phone: '01582 861 472',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: 'Nimbus Park',
				line2: 'Unit 1, Porz Avenue',
				town: 'Dunstable',
				county: 'Bedfordshire',
				postcode: 'LU5 5WZ'
			})
		}),
		new Warehouse({
			info: 'Self Storage Walsall',
			phone: '0121 526 3999',
			openDays: '7 days a week',
			schedule: '24hrs',
			address: new Address({
				line1: 'Station Street',
				line2: 'Darlaston',
				town: 'Walsall',
				county: 'West Midlands',
				postcode: 'WS10 8BW'
			})
		})
	];

	GetWarehouses(): IWarehouse[] {
		console.log(this.warehouses);
		return this.warehouses;
	}

	constructor() {
		console.log('constructor(): WarehouseService');
	}

}
