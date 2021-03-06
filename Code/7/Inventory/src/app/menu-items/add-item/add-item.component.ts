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
	itemId: number;

	constructor(
		private formBuilder: FormBuilder,
		private inventoryService: InventoryMockService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe((params) => {
			this.itemId = params['id'] ? params.id : 0;
		});
	}

	ngOnInit(): void {
		console.log(`this.itemId: ${this.itemId}`);

		// this.item =
		// 	this.itemId == 0
		// 		? new InventoryItem()
		// 		: this.inventoryService.getItemById(this.itemId);

		// face partea de initializare partiala cand intri pe "edit/10010" de ex.
		let onAddItemPage = false;

		if (this.itemId == 0) {
			onAddItemPage = true;
		}

		if (onAddItemPage) {
			this.item = new InventoryItem();

			this.addItemForm = this.formBuilder.group({
				name: ['', Validators.required],
				description: ['', Validators.maxLength(100)],
				user: ['', Validators.required],
				location: ['', Validators.required],
				inventoryNumber: ['', Validators.required],
				createdAt: ['', Validators.required]
			});
		} else {
			this.item = this.inventoryService.getItemById(this.itemId);

			this.addItemForm = this.formBuilder.group({
				name: [this.item.name, Validators.required],
				description: [this.item.description, Validators.maxLength(100)],
				user: [this.item.user, Validators.required],
				location: [this.item.location, Validators.required],
				inventoryNumber: [this.item.inventoryNumber, Validators.required],
				createdAt: [
					this.item.createdAt.toISOString().split('T')[0],
					Validators.required
				]
			});
		}

	}

	onSubmit(): void {
		console.log('onSubmit():');

		// trebuie sa testam daca avem deja sau nu acest id in array
		if (this.itemId == 0) {
			this.item = new InventoryItem(this.addItemForm.value);
			this.item.createdAt = new Date(this.addItemForm.value.createdAt);
			this.item.modifiedAt = new Date();
			this.item.deleted = false;
			this.item.id = this.inventoryService.getLastId() + 1;
			this.inventoryService.addItem(this.item);
			this.router.navigate(['/inventory']);
		} else {
			this.item.name = this.addItemForm.value.name;
			this.item.user = this.addItemForm.value.user;
			this.item.description = this.addItemForm.value.description;
			this.item.location = this.addItemForm.value.location;
			this.item.inventoryNumber = this.addItemForm.value.inventoryNumber;
			this.item.createdAt = new Date(this.addItemForm.value.createdAt);
			this.item.modifiedAt = new Date();
		}
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addItemForm.controls[controlName].hasError(errorName);
	};

}
