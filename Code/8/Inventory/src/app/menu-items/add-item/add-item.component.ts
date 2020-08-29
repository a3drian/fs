import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInventoryItem, InventoryItem } from '../../app-logic/inventory-item';
import { InventoryMockService } from '../../app-logic/inventory-mock.service';
import { Router, ActivatedRoute } from '@angular/router';
// 8:
import { InventoryListService } from '../../app-logic/inventory-list.service';

@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

	addItemForm: FormGroup;
	item: any;
	itemId: string;

	constructor(
		private inventoryMockService: InventoryMockService,
		private inventoryListService: InventoryListService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe((params) => {
			this.itemId = params['id'] ? params.id : 0;
		});
	}

	// all the input forms are left blank
	displayBlankForm(): void {
		console.log('displayEmptyForm():');
		this.item = new InventoryItem({
			id: 0,
			name: '',
			user: '',
			location: '',
			inventoryNumber: '',
			description: '',
			createdAt: '',
			modifiedAt: '',
			deleted: false,
			active: true
		});

		this.addItemForm = this.formBuilder.group({
			name: ['', Validators.required],
			user: ['', Validators.required],
			location: ['', Validators.required],
			inventoryNumber: ['', Validators.required],
			description: ['', Validators.maxLength(100)],
			createdAt: ['', Validators.required]
		});
	}

	// pre-populates the form using information from the "item" retrieved from the service
	displayItemInForm(): void {
		console.log('displayItemInForm():');
		// this.item = this.inventoryMockService.getItemById(this.itemId);
		this.item = this.inventoryListService.getDataById(this.itemId);

		// this.addItemForm = this.formBuilder.group({
		// 	name: [this.item.name, Validators.required],
		// 	user: [this.item.user, Validators.required],
		// 	location: [this.item.location, Validators.required],
		// 	inventoryNumber: [this.item.inventoryNumber, Validators.required],
		// 	description: [this.item.description, Validators.maxLength(100)],
		// 	createdAt: [
		// 		this.item.createdAt.toISOString().split('T')[0],
		// 		Validators.required
		// 	]
		// });
	}

	ngOnInit(): void {
		console.log(`this.itemId: ${this.itemId}`);

		let inAddItemPage = false;

		if (this.itemId == '0') {
			inAddItemPage = true;
		}

		if (inAddItemPage) {
			this.displayBlankForm();
		} else {
			// face partea de initializare partiala, cand intri pe 'edit/10010', de ex.
			this.displayItemInForm();
		}

	}

	addNewItem(): void {
		console.log('addNewItem():');
		const form = this.addItemForm.value;
		this.item =
		{
			name: form.name,
			user: form.user,
			location: form.location,
			inventoryNumber: form.inventoryNumber,
			description: form.description,
			createdAt: new Date(form.createdAt),
			modifiedAt: new Date(),
			deleted: false,
			active: true
		};
		this.inventoryListService.addItem(this.item);
		this.router.navigate(['/inventory']);
	}

	editExistingItem(): void {
		console.log('editExistingItem():');
		this.item.name = this.addItemForm.value.name;
		this.item.user = this.addItemForm.value.user;
		this.item.description = this.addItemForm.value.description;
		this.item.location = this.addItemForm.value.location;
		this.item.inventoryNumber = this.addItemForm.value.inventoryNumber;
		this.item.createdAt = new Date(this.addItemForm.value.createdAt);
		this.item.modifiedAt = new Date();
		this.router.navigate(['/inventory']);
	}

	onSubmit(): void {
		console.log('onSubmit():');

		// trebuie sa testam daca avem deja sau nu acest id in array
		if (this.itemId == '0') {
			this.addNewItem();
		} else {
			this.editExistingItem();
		}
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addItemForm.controls[controlName].hasError(errorName);
	};

}
