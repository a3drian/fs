import { Injectable, OnInit } from '@angular/core';

import { Laptop } from './laptop.model';

@Injectable({
	providedIn: 'root'
})

export class LaptopService implements OnInit {

	laptops: Laptop[] = [
		<Laptop>{
			id: 'PRD676869',
			owner: 'Vincent Chase',
			model: 'Asus VivoBook 15',
			sn: 'ahCZaNAM'
		},
		<Laptop>{
			id: 'PRD156651',
			owner: 'Eric Murphy',
			model: 'Macbook Air',
			sn: 'MtZG7cjt'
		}
	];

	GetLaptops(): Laptop[] {
		return this.laptops;
	}

	constructor() { console.log('constructor(): LaptopService') }

	ngOnInit(): void {
		console.log('ngOnInit(): LaptopService');
	}

}