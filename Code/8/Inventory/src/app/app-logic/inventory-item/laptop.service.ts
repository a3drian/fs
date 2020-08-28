import { Injectable, OnInit } from '@angular/core';

import { Laptop } from './laptop.model';

@Injectable({
	providedIn: 'root'
})

export class LaptopService implements OnInit {

	laptops: Laptop[] = [
		new Laptop({
			id: 'PRD676869',
			owner: 'Vincent Chase',
			model: 'Asus VivoBook 15',
			serialNumber: 'ahCZaNAM'
		}),
		new Laptop({
			id: 'PRD156651',
			owner: 'Eric Murphy',
			model: 'Macbook Air',
			serialNumber: 'MtZG7cjt'
		})
	];

	GetLaptops(): Laptop[] {
		return this.laptops;
	}

	constructor() { console.log('constructor(): LaptopService') }

	ngOnInit(): void {
		console.log('ngOnInit(): LaptopService');
	}

}