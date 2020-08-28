import { Component, OnInit } from '@angular/core';

import { IWarehouse } from '../../../app-logic/warehouse/warehouse.model';
import { WarehouseService } from '../../../app-logic/warehouse/warehouse.service';

@Component({
	selector: 'app-warehouse-detail',
	templateUrl: './warehouse-detail.component.html',
	styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {

	warehouses: IWarehouse[] = [];

	constructor(private warehousesService: WarehouseService) { }

	ngOnInit(): void {
		this.warehouses = this.warehousesService.GetWarehouses();
	}

}
