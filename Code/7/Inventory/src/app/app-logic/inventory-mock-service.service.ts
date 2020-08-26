import { Injectable } from '@angular/core';

import { IInventoryItem, InventoryItem } from './inventory-item';

@Injectable({
	providedIn: 'root'
})
export class InventoryMockService {

	inventoryData: IInventoryItem[] = [
		new InventoryItem({
			id: 10001,
			name: 'PC01',
			user: 'Johannes Kepler',
			description: 'Dell precision PC',
			location: 'Level 2',
			inventoryNumber: 20190001,
			createdAt: new Date('2019-01-01'),
			modifiedAt: new Date('2020-02-02'),
			deleted: false
		}),
		new InventoryItem({
			id: 10002,
			name: 'PC02',
			user: 'Max Planck',
			description: 'Dell precision PC',
			location: 'Level 2',
			inventoryNumber: 20190002,
			createdAt: new Date('2019-01-01'),
			modifiedAt: new Date('2020-02-03'),
			deleted: false
		}),
		new InventoryItem({
			id: 10003,
			name: 'PC03',
			user: 'Michael Faraday',
			description: 'Dell precision PC',
			location: 'Level 1',
			inventoryNumber: 20190003,
			createdAt: new Date('2019-01-01'),
			modifiedAt: new Date('2020-02-03'),
			deleted: true
		}),
		new InventoryItem({
			id: 10004,
			name: 'PC04',
			user: 'Wolfgang Ernst Pauli',
			description: 'Dell precision PC',
			location: 'Level 1',
			inventoryNumber: 20190004,
			createdAt: new Date('2019-01-01'),
			modifiedAt: new Date('2020-03-05'),
			deleted: false
		}),
		new InventoryItem({
			id: 10005,
			name: 'PC05',
			user: 'Isaac Newton',
			description: 'Dell precision PC',
			location: 'Level 1',
			inventoryNumber: 20190004,
			createdAt: new Date('2020-02-05'),
			modifiedAt: new Date('2020-03-05'),
			deleted: true
		}),
		new InventoryItem({
			id: 10006,
			name: 'HS01',
			user: 'Johannes Kepler',
			description: 'Headset monoligt M1060',
			location: 'Level 2',
			inventoryNumber: 20200006,
			createdAt: new Date('2020-01-01'),
			modifiedAt: new Date('2020-02-02'),
			deleted: false
		}),
		new InventoryItem({
			id: 10007,
			name: 'HS02',
			user: 'Max Planck',
			description: 'Headset monoligt M1060',
			location: 'Level 2',
			inventoryNumber: 20200007,
			createdAt: new Date('2020-01-01'),
			modifiedAt: new Date('2020-02-03'),
			deleted: false
		}),
		new InventoryItem({
			id: 10008,
			name: 'HS03',
			user: 'Michael Faraday',
			description: 'Headset monoligt M1060',
			location: 'Level 1',
			inventoryNumber: 20200008,
			createdAt: new Date('2020-01-01'),
			modifiedAt: new Date('2020-02-03'),
			deleted: true
		}),
		new InventoryItem({
			id: 10009,
			name: 'HS04',
			user: 'Wolfgang Ernst Pauli',
			description: 'Headset monoligt M1060',
			location: 'Level 1',
			inventoryNumber: 20200009,
			createdAt: new Date('2020-01-01'),
			modifiedAt: new Date('2020-03-05'),
			deleted: false
		}),
		new InventoryItem({
			id: 10010,
			name: 'HS05',
			user: 'Isaac Newton',
			description: 'Headset monoligt M1060',
			location: 'Level 1',
			inventoryNumber: 20200004,
			createdAt: new Date('2020-02-05'),
			modifiedAt: new Date('2020-03-05'),
			deleted: true
		})
	];

	constructor() { }

	getData(): IInventoryItem[] {
		return this.inventoryData;
	}

	deleteData(toBeDeleted: any[]): void {
		console.log('deleteData():')
		console.log(toBeDeleted);

		let indexes: number[] = [];
		toBeDeleted.forEach(element => {
			indexes.push(this.inventoryData.indexOf(element));
		});
		indexes.sort();
		indexes.reverse();

		console.log('index:' + indexes);
		indexes.forEach(index => {
			this.inventoryData.splice(index, 1);
		})

		console.log(this.inventoryData);
	}

	setDataToFalse(toBeDeleted: any[]): void {
		console.log('setDataToFalse():')
		console.log(toBeDeleted);

		toBeDeleted.forEach(element => {
			const index = this.inventoryData.indexOf(element);
			this.inventoryData[index].deleted = true;
		});

		console.log(this.inventoryData);
	}

	canEdit(data): boolean {
		// console.log('canEdit(data):');
		const item: IInventoryItem = data;
		// console.log(item);
		if (item.deleted === true) {
			return false;
		} else {
			return true;
		}
	}

	addItem(item: IInventoryItem): void {
		this.inventoryData.push(item);
	}

	getLastId(): number {
		return Math.max.apply(
			Math,
			this.inventoryData.map((x) => {
				x.id;
			})
		);
	}

	getItemById(id: number): IInventoryItem {
		return this.inventoryData.filter((x) => {
			x.id == id;
		})[0]; // ne intereseaza doar primul element din filtrare, id-ul
	}
}
