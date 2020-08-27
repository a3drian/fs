import { Component, OnInit, ViewChild } from '@angular/core';

import { IInventoryItem, InventoryItem } from 'src/app/app-logic/inventory-item';
import { InventoryMockService } from '../../app-logic/inventory-mock-service.service';
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

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
		'deleted',
		// 'test',
		'edit',
		'actions'
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	initialSelection = [];
	allowMultiSelect: boolean = true;
	selection = new SelectionModel<Element>(this.allowMultiSelect, this.initialSelection);
	@ViewChild(MatTable, { static: true }) table;

	constructor(private inventoryMockService: InventoryMockService) { }

	ngOnInit(): void {
		console.log('ngOnInit(): InventoryComponent');
		this.inventoryItems = new MatTableDataSource<IInventoryItem>(this.inventoryMockService.getData());
		this.inventoryItems.paginator = this.paginator;
		this.inventoryItems.sort = this.sort;
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
			this.inventoryItems.data.forEach(row => {
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
		const noOfSelected = this.selection.selected.length;
		const noOfColumns = this.inventoryItems.data.length;
		// console.log(`${noOfSelected} ${noOfColumns}`);
		return noOfSelected === noOfColumns;
	}

	canDelete(): boolean {
		if (this.selectionHasValue()) {
			return false;
		} else {
			return true;
		}
	}

	canEdit(row): boolean {
		return this.inventoryMockService.canEdit(row);
	}

	editInventoryItem(row): void {
		console.log('editInventoryItem():');
		console.log(row);
	}

	deleteInventoryItem(): void {
		console.log('deleteInventoryItem():');
		console.log(this.selection.selected);
		const toBeDeleted = this.selection.selected;
		this.inventoryMockService.deleteData(toBeDeleted);
		this.selection.clear();
	}

	setInventoryItemToFalse(): void {
		console.log('setInventoryItemToFalse():');
		console.log(this.selection.selected);
		const toBeDeleted = this.selection.selected;
		this.inventoryMockService.setDataToFalse(toBeDeleted);
		this.selection.clear();
	}

	// reloadData(): void {
	// 	this.inventoryItems = new MatTableDataSource<IInventoryItem>(this.inventoryMockService.getData());
	// 	this.inventoryItems.paginator = this.paginator;
	// 	this.inventoryItems.sort = this.sort;
	// }

	test: boolean = false;
}
