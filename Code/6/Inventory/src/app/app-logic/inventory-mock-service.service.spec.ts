import { TestBed } from '@angular/core/testing';

import { InventoryMockServiceService } from './inventory-mock-service.service';

describe('InventoryMockServiceService', () => {
	let service: InventoryMockServiceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(InventoryMockServiceService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
