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
	item: any;

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
		return request;
	}

	// GET/:id
	getDataById(id: string) {
		console.log('getDataById(id: string):');
		const url = this.BASE_URL + '/' + id;
		console.log('url:', url);
		this.http.get<IInventoryItem>(url)
			.pipe()
			.subscribe()

		return this.item;
	}

	// DELETE
	setDataToInactive(toBeDeleted: any[]): void {
		console.log('setDataToInactive(toBeDeleted: any[]):');
		console.log(toBeDeleted);

		toBeDeleted.forEach(element => {
			// const index = this.inventoryData.indexOf(element);
			// this.inventoryData[index].deleted = true;
			// this.http.put('/api/inventory-items', {}, {});
			console.log(element);
		});

		console.log('setDataToInactive(toBeDeleted: any[])^');
	}

	// ADD
	addItem(item: any): void {
		console.log('addItem(item: IInventoryItem):');

		this.http.post<IInventoryItem>(this.BASE_URL, item)
			.pipe()
			.subscribe((error) => {
				console.log('(error) addItem(item: IInventoryItem):', error);
			});
	}

	// EDIT
}