import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { IWarehouse } from 'inventory-interfaces/IWarehouse';

// 9:
import { WarehouseListService } from '../../app-logic/warehouse/warehouse-list.service';
import { merge, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	constructor(private warehousesListService: WarehouseListService) { }

	warehouses: IWarehouse[];
	contactColumns: string[] = [
		'info',
		'phone',
		'openDays',
		'schedule',
		'address',
		'active',
		'actions'
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	initialSelection = [];
	allowMultiSelect = true;
	selection = new SelectionModel<IWarehouse>(this.allowMultiSelect, this.initialSelection);

	isLoading: boolean;
	activeOnly$ = new BehaviorSubject(false);
	itemsCount = 0;

	ngOnInit(): void {

		console.log('ngOnInit(): ContactComponent');
		merge(this.sort.sortChange, this.activeOnly$)
			.subscribe(
				() => {
					this.paginator.pageIndex = 0;
				}
			);

		merge(this.paginator.page, this.sort.sortChange, this.activeOnly$)
			.pipe(
				switchMap(
					() => {
						this.isLoading = true;
						return this.warehousesListService
							.getData(
								this.paginator.pageIndex + 1,
								this.paginator.pageSize,
								this.sort.active
									? `${this.sort.active}_${this.sort.direction ? this.sort.direction : 'asc'}`
									: '',
								this.activeOnly
							);
					}
				)
			)
			.subscribe(
				(data) => {
					// accesam un tuplu acum => trebuie sa ajungem la index-ul 0 si index-ul 1
					this.warehouses = data[0];
					this.itemsCount = data[1];
					this.isLoading = false;
				},
				(error) => {
					console.log('Table could not be filled with data', error);
					this.isLoading = false;
				}
			);

	}

	// Active only filter
	get activeOnly(): boolean {
		return this.activeOnly$.value;
	}

	set activeOnly(value: boolean) {
		this.activeOnly$.next(value);
	}

	// EDIT
	canEdit(element): boolean {
		return this.warehousesListService.canEdit(element);
	}

	// DELETE
	deleteWarehouse(element): void {
		console.log('deleteWarehouse(element):');
		console.log('element:', element);
		this.warehousesListService
			.deleteItem(element)
			.subscribe(
				() => {
					console.log('deleteWarehouse(element)^');
				}
			);
	}

	// SET INACTIVE
	setInactiveWarehouse(element): void {
		console.log('setInactiveWarehouse(element):');
		console.log('element:', element);
		this.warehousesListService
			.setInactiveItem(element)
			.subscribe(
				() => {

				}
			);
	}
}
