import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// 9:
import { IWarehouse } from 'inventory-interfaces/IWarehouse';

@Injectable({
	providedIn: 'root',
})
export class WarehouseListService {

	readonly BASE_URL: string = '/api/warehouses';

	constructor(private http: HttpClient) { }

	getData(
		pageNumber = 1,
		pageSize = 5,
		sorting = '',
		activeOnly = false
	): Observable<[IWarehouse[], number]> {

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
			.get<IWarehouse[]>(this.BASE_URL,
				{
					params: params,
					observe: 'response'
				}
			)
			.pipe(
				tap(
					(response) => {
						console.log('Warehouses fetched:', response.body);
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

	// DELETE
	deleteItem(item: IWarehouse): Observable<IWarehouse> {
		console.log('deleteItem(item: IWarehouse):');
		console.log('item:', item);
		const url = `${this.BASE_URL}/${item.id}`;
		console.log('url:', url);

		const request = this.http.delete<IWarehouse>(url)
			.pipe(
				tap(
					() => {
						console.log('Warehouse "', item.id, '" was deleted!');
					}
				)
			);

		console.log('deleteItem(item: IWarehouse)^');

		return request;
	}

	setInactiveItem(item: IWarehouse): Observable<IWarehouse> {
		console.log('setInactiveItem(item: IWarehouse):');
		console.log('item:', item);
		const url = `${this.BASE_URL}/${item.id}`;
		console.log('url:', url);

		item.active = false;

		const request = this.http.put<IWarehouse>(url, item)
			.pipe(
				tap(
					() => {
						console.log('Warehouse "', item.id, '" was set to inactive!');
					}
				)
			);

		console.log('setInactiveItem(item: IWarehouse)^');

		return request;
	}

	// EDIT
	canEdit(item: IWarehouse): boolean {

		// console.log('canEdit(item):');
		// console.log(item);

		if (item.active === true) {
			return true;
		} else {
			return false;
		}
	}

}