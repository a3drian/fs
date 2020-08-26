import { TestBed } from '@angular/core/testing';

import { InventoryMockService } from './inventory-mock-service.service';

describe('InventoryMockServiceService', () => {
	let service: InventoryMockService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(InventoryMockService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
