import { Component, OnInit } from '@angular/core';

import { InventoryItemService } from 'src/app/app-logic/inventory-item/inventory-item.service';
import { Laptop } from 'src/app/app-logic/inventory-item/laptop.model';
import { Phone } from 'src/app/app-logic/inventory-item/phone.model';

@Component({
	selector: 'app-inventory-item-detail',
	templateUrl: './inventory-item-detail.component.html',
	styleUrls: ['./inventory-item-detail.component.css']
})

export class InventoryItemDetailComponent implements OnInit {

	laptops: Laptop[] = [];
	phones: Phone[] = [];

	constructor(private inventoryItemService: InventoryItemService) { }

	ngOnInit(): void {
		this.laptops = this.inventoryItemService.GetLaptops();
		this.phones = this.inventoryItemService.GetPhones();
	}

}
