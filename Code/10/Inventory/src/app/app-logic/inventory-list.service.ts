import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// 9:
import { IInventoryItem } from 'inventory-interfaces/IInventoryItem';
import { InventoryItem } from './inventory-item';

@Injectable({
	providedIn: 'root',
})
export class InventoryListService {

	readonly BASE_URL: string = '/api/inventory-items';

	constructor(private http: HttpClient) { }

	// GET
	// getData(): Observable<IInventoryItem[]> {
	// 	const request = this.http.get<IInventoryItem[]>(this.BASE_URL)
	// 		.pipe(
	// 			tap((response) => {
	// 				console.log('Inventory items fetched:', response);
	// 			}),
	// 			delay(100 + Math.floor(Math.random() * 900))
	// 		);
	// 	return request;
	// }

	getData(
		pageNumber = 1,
		pageSize = 5,
		sorting = '',
		activeOnly = false
	): Observable<[IInventoryItem[], number]> {

		let params = new HttpParams()
			.set('activeOnly', activeOnly ? 'true' : 'false')
			.set('pageNumber', pageNumber.toString())
			.set('pageSize', pageSize.toString());

		console.log('getData():');
		console.log('params:', params);

		const keys = params.keys();

		keys.forEach(element => {
			const value = params.getAll(element);
			console.log(element, '\t', value);
		});

		if (sorting) {
			params = params.set('sort', sorting);
		}

		return this.http
			.get<IInventoryItem[]>(this.BASE_URL,
				{
					params: params,
					observe: 'response'
				}
			)
			.pipe(
				tap(
					(response) => {
						console.log('Inventory items fetched:', response.body);
					}
				),
				map(
					(response) => {
						return [
							response.body,
							parseInt(response.headers.get('X-Count'))
						];
					}
				)
			);
	}

	// GET/:id
	getDataById(id: string): Observable<IInventoryItem> {

		console.log('getDataById(id: string):');
		const url = `${this.BASE_URL}/${id}`;
		console.log('url:', url);

		const request = this.http.get<IInventoryItem>(url)
			.pipe(
				tap(
					(response) => {
						console.log('Inventory item fetched:', response);
					}
				)
			);
		return request;
	}

	// DELETE
	deleteItem(item: IInventoryItem): Observable<IInventoryItem> {
		console.log('deleteItem(item: IInventoryItem):');
		console.log('item:', item);
		const url = `${this.BASE_URL}/${item.id}`;
		console.log('url:', url);

		const request = this.http.delete<IInventoryItem>(url)
			.pipe(
				tap(
					() => {
						console.log('Item "', item.id, '" was deleted!');
					}
				)
			);

		console.log('deleteItem(item: IInventoryItem)^');

		return request;
	}

	setInactiveItem(item: IInventoryItem): Observable<IInventoryItem> {
		console.log('setInactiveItem(item: IInventoryItem):');
		console.log('item:', item);
		const url = `${this.BASE_URL}/${item.id}`;
		console.log('url:', url);

		const updatedItem = new InventoryItem(item);
		updatedItem.active = false;

		const request = this.http.put<IInventoryItem>(url, updatedItem)
			.pipe(
				tap(
					() => {
						console.log('Item "', updatedItem.id, '" was set to inactive!');
					}
				)
			);

		console.log('setInactiveItem(item: IInventoryItem)^');

		return request;
	}

	// ADD
	addItem(item: IInventoryItem): Observable<IInventoryItem> {
		console.log('addItem(item: IInventoryItem):');

		const request = this.http.post<IInventoryItem>(this.BASE_URL, item)
			.pipe(
				tap(
					() => {
						console.log('Item "', item.name, '"was created!');	// nu merge sa pui "item.id" => undefined
					}
				)
			);

		return request;
	}

	// EDIT
	canEdit(item: IInventoryItem): boolean {

		// console.log('canEdit(item):');
		// console.log(item);

		if (item.active === true) {
			return true;
		} else {
			return false;
		}
	}

	editItem(item: IInventoryItem): Observable<IInventoryItem> {
		console.log('editItem(item: IInventoryItem):');
		console.log('item:', item);
		const url = `${this.BASE_URL}/${item.id}`;
		console.log('url:', url);

		const request = this.http.put<IInventoryItem>(url, item)
			.pipe(
				tap(
					() => {
						console.log('Item "', item.id, '" was edited!');
					}
				)
			);

		console.log('editItem(item: IInventoryItem)^');

		return request;
	}

}
