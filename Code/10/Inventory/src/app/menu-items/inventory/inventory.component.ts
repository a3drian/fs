import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { InventoryListService } from '../../app-logic/inventory-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
// 8:
import { merge, BehaviorSubject } from 'rxjs';
// 9:
import { switchMap } from 'rxjs/operators';
import { IInventoryItem } from 'inventory-interfaces/IInventoryItem';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {

	inventoryItems: IInventoryItem[];
	inventoryColumns: string[] = [
		'select',
		'id',
		'name',
		'user',
		'description',
		'location',
		'inventoryNumber',
		'createdAt',
		'modifiedAt',
		'active',
		'actions'
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	initialSelection = [];
	allowMultiSelect = true;
	selection = new SelectionModel<IInventoryItem>(this.allowMultiSelect, this.initialSelection);

	isLoading: boolean;
	activeOnly$ = new BehaviorSubject(false);
	itemsCount = 0;
	refreshTable$ = new BehaviorSubject(false);

	constructor(private inventoryListService: InventoryListService) { }

	ngOnInit(): void {

		console.log('InventoryComponent, ngOnInit():');

		// Inventory List
		merge(this.sort.sortChange, this.activeOnly$, this.refreshTable$)
			.subscribe(
				() => {
					this.paginator.pageIndex = 0;
				}
			);

		merge(this.paginator.page, this.sort.sortChange, this.activeOnly$, this.refreshTable$)
			.pipe(
				switchMap(
					() => {
						this.isLoading = true;
						return this.inventoryListService
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
					this.inventoryItems = data[0];
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

	// Refresh table
	get refreshTable(): boolean {
		return this.refreshTable$.value;
	}

	set refreshTable(value: boolean) {
		this.refreshTable$.next(value);
	}

	// SELECTION
	selectRow(row): void {
		console.log('selectRow(row):');
		console.log(row);
		this.selection.toggle(row);
		console.log(this.selection.selected);
	}

	checkIsRowSelected(row): boolean {
		// console.log('checkIsSelected(row):')
		// console.log(row);
		return this.selection.isSelected(row);
	}

	masterSelectionToggle(): void {
		console.log('masterSelectionToggle():');
		this.isAllItemsSelected() ?
			this.selection.clear() :
			this.inventoryItems.forEach(
				(row) => {
					this.selection.select(row);
				}
			);
		console.log(this.selection.selected);
	}

	isMasterSelection(): boolean {
		return this.selectionHasValue() && this.isAllItemsSelected();
	}

	isIndeterminateSelection(): boolean {
		return this.selectionHasValue() && !this.isAllItemsSelected();
	}

	onMasterSelectionToggleChange(event): void | null {
		if (event) {
			this.masterSelectionToggle();
			// console.log(event);
		} else {
			return null;
		}
	}

	selectionHasValue(): boolean {
		return this.selection.hasValue();
	}

	isAllItemsSelected(): boolean {
		// console.log('isAllItemsSelected():');
		const noOfSelected = this.selection.selected.length;
		const noOfItems = this.inventoryItems.length;
		// console.log(`${noOfSelected} = ${noOfItems}`);
		return noOfSelected === noOfItems;
	}

	// EDIT
	canEdit(element): boolean {
		return this.inventoryListService.canEdit(element);
	}

	editInventoryItem(element): void {
		console.log('editInventoryItem():');
		console.log(element);
	}

	// DELETE
	canDeleteSelection(): boolean {
		if (this.selectionHasValue()) {
			return false;
		} else {
			return true;
		}
	}

	deleteInventoryItem(element): void {
		console.log('deleteInventoryItem(element):');
		console.log('element:', element);
		this.inventoryListService
			.deleteItem(element)
			.subscribe(
				() => {
					this.refreshTable = true;
				}
			);
	}

	deleteSelection(): void {
		console.log('deleteSelection():');
		console.log(this.selection.selected);
		const toBeDeleted = this.selection.selected;

		toBeDeleted.forEach(
			(element) => {
				this.deleteInventoryItem(element);
			}
		);

		this.selection.clear();
	}

	// SET INACTIVE
	canSetInactiveSelection(): boolean {
		if (this.selectionHasValue()) {
			return false;
		} else {
			return true;
		}
	}

	setInactiveInventoryItem(element): void {
		console.log('setInactiveInventoryItem(element):');
		console.log('element:', element);
		this.inventoryListService
			.setInactiveItem(element)
			.subscribe(
				() => {
					this.refreshTable = true;
				}
			);
	}

	setInactiveSelection(): void {
		console.log('deleteSelection():');
		console.log(this.selection.selected);
		const toBeSetToInactive = this.selection.selected;

		toBeSetToInactive.forEach(
			(element) => {
				this.setInactiveInventoryItem(element);
			}
		);

		this.selection.clear();
	}

}
