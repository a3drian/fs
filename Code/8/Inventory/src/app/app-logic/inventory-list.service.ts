import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IInventoryItem } from './inventory-item';
import { Observable } from 'rxjs';
import { tap, map, delay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class InventoryListService {

	constructor(private http: HttpClient) { }

	getData() {
		return this.http.get<IInventoryItem[]>('/api/inventory-items')
			.pipe(
				tap((response) => {
					console.log('Inventory items fetched:', response);
				}),
				delay(100 + Math.floor(Math.random() * 900))
				// delay(2000)
			);
	}
}