import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInventoryItem, InventoryItem } from '../../app-logic/inventory-item';
import { InventoryMockService } from '../../app-logic/inventory-mock-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

	addItemForm: FormGroup;
	item: IInventoryItem;

	constructor(
		private formBuilder: FormBuilder,
		private inventoryService: InventoryMockService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		// this.activatedRoute.params.subscribe((params) => {
		// 	this.itemId = params['id'] ? params.id : 0;
		// });
	}

	ngOnInit(): void {
		this.addItemForm = this.formBuilder.group({
			name: ['', Validators.required],
			description: ['', Validators.maxLength(100)],
			user: ['', Validators.required],
			location: ['', Validators.required],
			inventoryNumber: ['', Validators.required],
			createdAt: ['', Validators.required],
		});
	}

	onSubmit(): void {
		this.item = new InventoryItem(this.addItemForm.value);
		this.item.modifiedAt = new Date();
		this.item.deleted = false;
		this.item.id = this.inventoryService.getLastId() + 1;
		this.inventoryService.addItem(this.item);
		this.router.navigate(['/inventory']);
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addItemForm.controls[controlName].hasError(errorName);
	};

}
