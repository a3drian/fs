import { Component, OnInit, ViewChild } from '@angular/core';

import { IWarehouse } from '../../app-logic/warehouse/warehouse.model';
import { WarehouseService } from '../../app-logic/warehouse/warehouse.service';

// mat-table:
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

	// warehouses: IWarehouse[] = [];

	constructor(private warehousesService: WarehouseService) { }

	ngOnInit(): void {
		console.log('ngOnInit(): ContactComponent')
		this.warehouses = new MatTableDataSource<IWarehouse>(this.warehousesService.GetWarehouses());
		this.warehouses.paginator = this.paginator;
		this.warehouses.sort = this.sort;
	}

	warehouses: any;
	contactColumns: String[] = [
		// 'select',
		'info',
		'phone',
		'openDays',
		'schedule',
		'address'
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	initialSelection = [];
	allowMultiSelect: boolean = true;
	selection = new SelectionModel<Element>(this.allowMultiSelect, this.initialSelection);

}
