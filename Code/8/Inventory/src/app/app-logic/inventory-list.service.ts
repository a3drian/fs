import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IInventoryItem, InventoryItem } from './inventory-item';
import { Observable } from 'rxjs';
import { finalize, tap, map, delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class InventoryListService {

	readonly BASE_URL: string = '/api/inventory-items';
	readonly ACTIVEONLY_URL: string = '/api/inventory-items?activeOnly=true';

	constructor(private http: HttpClient) { }

	// GET
	getData() {
		const request = this.http.get<IInventoryItem[]>(this.BASE_URL)
			.pipe(
				tap((response) => {
					console.log('Inventory items fetched:', response);
				}),
				delay(100 + Math.floor(Math.random() * 900))
			);
		console.log('');
		return request;
	}

	getActiveData() {
		const request = this.http.get<IInventoryItem[]>(this.ACTIVEONLY_URL)
			.pipe(
				tap((response) => {
					console.log('Inventory items fetched:', response);
				}),
				delay(100 + Math.floor(Math.random() * 900))
			);
		console.log('');
		return request;
	}

	// GET/:id
	getDataById(id: string) {

		console.log('getDataById(id: string):');
		const url = `${this.BASE_URL}/${id}`;
		console.log('url:', url);

		const request = this.http.get<IInventoryItem>(url)
			.pipe(
				tap((response) => {
					console.log('Inventory item fetched:', response);
				})
			);
		console.log('');
		return request;
	}

	// DELETE
	setDataToInactive(toBeSetToInactive: any[]): void {
		console.log('setDataToInactive(toBeSetToInactive: any[]):');
		console.log(toBeSetToInactive);

		toBeSetToInactive.forEach(element => {
			// const index = this.inventoryData.indexOf(element);
			// this.inventoryData[index].deleted = true;
			// this.http.put('/api/inventory-items', {}, {});
			console.log(element);
		});

		console.log('setDataToInactive(toBeSetToInactive: any[])^');
	}

	deleteItem(item: any): void {
		console.log('deleteItem(item: any):');
		const url = `${this.BASE_URL}/${item.id}`;
		console.log('url:', url);
		const request = this.http.delete<IInventoryItem>(url)
			.pipe()
			.subscribe();
	}

	setInactiveItem(item: any): void {
		console.log('setInactiveItem(item: any):');
		console.log('item:', item);
		item.active = false;

		const request = this.http.put<IInventoryItem>(this.BASE_URL, item)
			.pipe()
			.subscribe();
		console.log('setInactiveItem(item: any)^');
	}

	// ADD
	addItem(item: any): void {
		console.log('addItem(item: IInventoryItem):');

		this.http.post<IInventoryItem>(this.BASE_URL, item)
			.pipe()
			.subscribe();
	}

	// EDIT
	canEdit(item: any): boolean {

		// console.log('canEdit(item):');
		// console.log(item);

		if (item.active === true) {
			return true;
		} else {
			return false;
		}
	}

	editItem(item: any): void {
		console.log('editItem(item: any):');
		console.log('item:', item);

		const request = this.http.put<IInventoryItem>(this.BASE_URL, item)
			.pipe()
			.subscribe();
		console.log('editItem(item: any)^');
	}
}