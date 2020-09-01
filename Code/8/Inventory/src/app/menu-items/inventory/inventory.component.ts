import { Component, OnInit, ViewChild } from '@angular/core';

import { IInventoryItem, InventoryItem } from 'src/app/app-logic/inventory-item';
// import { InventoryMockService } from '../../app-logic/inventory-mock.service';
import { InventoryListService } from '../../app-logic/inventory-list.service';
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
// 8:
import { finalize, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {

	inventoryItems: any;
	inventoryColumns: String[] = [
		'select',
		'id',
		'name',
		'user',
		'description',
		'location',
		'inventoryNumber',
		'createdAt',
		'modifiedAt',
		// 'deleted',
		'active',
		// 'test',
		// 'edit',
		'actions'
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	initialSelection = [];
	allowMultiSelect: boolean = true;
	selection = new SelectionModel<Element>(this.allowMultiSelect, this.initialSelection);
	@ViewChild(MatTable, { static: true }) table;
	isLoading: boolean;

	constructor(
		// private inventoryMockService: InventoryMockService,
		private inventoryListService: InventoryListService
	) { }

	ngOnInit(): void {
		console.log('ngOnInit(): InventoryComponent');

		// Inventory Mock
		// this.inventoryItems = new MatTableDataSource<IInventoryItem>(this.inventoryMockService.getData());
		// this.inventoryItems.paginator = this.paginator;
		// this.inventoryItems.sort = this.sort;

		// Inventory List
		this.isLoading = true;
		this.inventoryListService.getData()
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe((data) => {
				this.inventoryItems = data;
			}, (error) => {
				console.log('Table could not be filled with data:', error);
			});

		// Merge
		merge(this.paginator.page, this.sort.sortChange)
			.pipe(
				tap(() => {
					this.isLoading = true;
					this.inventoryListService.getData()
						.pipe(
							finalize(() => {
								this.isLoading = false;
							})
						)
						.subscribe((data) => {
							this.inventoryItems = data;
						}, (error) => {
							console.log('Table could not be paged/sorted:', error);
						});
				})
			)
			.subscribe();

	}

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
		console.log(this.selection.selected);
		this.isAllItemsSelected() ?
			this.selection.clear() :
			this.inventoryItems.forEach(row => {
				this.selection.select(row);
			});
	}

	isMasterSelection(): boolean {
		return this.selectionHasValue() && this.isAllItemsSelected();
	}

	isIndeterminateSelection(): boolean {
		return this.selectionHasValue() && !this.isAllItemsSelected();
	}

	onMasterSelectionToggleChange(event) {
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

	canDeleteSelection(): boolean {
		if (this.selectionHasValue()) {
			return false;
		} else {
			return true;
		}
	}

	canEdit(element): boolean {
		return this.inventoryListService.canEdit(element);
	}

	editInventoryItem(element): void {
		console.log('editInventoryItem():');
		console.log(element);
	}

	deleteInventoryItem(element): void {
		console.log('deleteInventoryItem(element):');
		console.log('element:', element);
		this.inventoryListService.deleteItem(element);

		this.reloadData();
	}

	setInactiveInventoryItem(element): void {
		console.log('deleteInventoryItem(element):');
		console.log('element:', element);
		this.inventoryListService.setInactiveItem(element);

		this.reloadData();
	}

	deleteSelection(): void {

	}

	oldSetInventoryItemToFalse(): void {
		console.log('setInventoryItemToFalse():');
		console.log(this.selection.selected);
		const toBeDeleted = this.selection.selected;
		// this.inventoryMockService.setDataToFalse(toBeDeleted);
		this.selection.clear();
	}

	reloadData(): void {
		// reload data
		this.inventoryListService.getData()
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe((data) => {
				this.inventoryItems = data;
			}, (error) => {
				console.log('Table could not be filled with data:', error);
			});
	}

	test: boolean = false;
}
