import { Component, OnInit } from '@angular/core';
import { InventoryItemService } from 'src/app/app-logic/inventory-item/inventory-item.service';

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		console.log('ngOnInit(): InventoryComponent');
	}

}
