import { Injectable, OnInit } from '@angular/core';

import { Laptop } from './laptop.model';
import { Phone } from './phone.model';
import { LaptopService } from './laptop.service';
import { PhoneService } from './phone.service';

@Injectable({
	providedIn: 'root'
})

export class InventoryItemService implements OnInit {

	laptops: Laptop[] = [];
	phones: Phone[] = [];

	constructor(private laptopService: LaptopService,
		private phoneService: PhoneService) {
		console.log('constructor(): InventoryItemService');

		this.laptops = this.laptopService.GetLaptops();
		this.phones = this.phoneService.GetPhones();
		console.log(this.laptops);
		console.log(this.phones);
	}

	ngOnInit() {
		console.log('ngOnInit(): InventoryItemService');
	}

	GetLaptops(): Laptop[] {
		return this.laptops;
	}

	GetPhones(): Phone[] {
		return this.phones;
	}

}