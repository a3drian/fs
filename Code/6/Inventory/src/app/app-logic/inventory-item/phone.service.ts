import { Injectable, OnInit } from '@angular/core';

import { Phone } from './phone.model';

@Injectable({
	providedIn: 'root'
})

export class PhoneService implements OnInit {

	phones: Phone[] = [
		new Phone({
			id: 'PRD456123',
			owner: 'Vincent Chase',
			model: 'iPhone XS',
			serialNumber: 'fJeYsCwq',
			provider: 'Vodafone RO',
			onContract: true
		}),
		new Phone({
			id: 'PRD654456',
			owner: 'Eric Murphy',
			model: 'iPhone X',
			serialNumber: 'Ee8sFRTg',
			provider: 'Orange',
			onContract: true
		})
	];

	GetPhones(): Phone[] {
		return this.phones;
	}

	constructor() { console.log('constructor(): PhoneService') }

	ngOnInit(): void {
		console.log('ngOnInit(): PhoneService');
	}

}