import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInventoryItem, InventoryItem } from '../../app-logic/inventory-item';
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
	showForm: boolean = false;
	buttonText: string = '';

	constructor(
		private inventoryListService: InventoryListService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.params.subscribe((params) => {
			this.itemId = params['id'] ? params.id : '0';
		});
	}

	// all the input forms are left blank
	displayBlankForm(): void {

		const today: Date = new Date();

		console.log('displayEmptyForm():');
		this.item = new InventoryItem({
			id: '0',
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
			createdAt: [
				today.toISOString().split('T')[0],
				Validators.required
			]
		});
	}

	// pre-populates the form using information from the "item" retrieved from the service
	displayItemInForm(): void {

		console.log('displayItemInForm():');

		this.inventoryListService.getDataById(this.itemId)
			.subscribe(
				(data) => {
					console.log('displayItemInForm(), data:', data);
					this.item =
					{
						id: data.id,
						name: data.name,
						user: data.user,
						location: data.location,
						inventoryNumber: data.inventoryNumber,
						description: data.description,
						createdAt: new Date(data.createdAt),
						modifiedAt: new Date(),
						deleted: data.deleted,
						active: data.active
					};
					console.log('in subscribe(), this.item:', this.item);

					if (this.item) {

						this.showForm = true;

						this.addItemForm = this.formBuilder.group({
							name: [this.item.name, Validators.required],
							user: [this.item.user, Validators.required],
							location: [this.item.location, Validators.required],
							inventoryNumber: [this.item.inventoryNumber, Validators.required],
							description: [this.item.description, Validators.maxLength(100)],
							createdAt: [
								this.item.createdAt.toISOString().split('T')[0],
								Validators.required
							]
						});

					} else {
						this.showForm = false;
					}

				}, (error) => {
					console.log('(error) getDataById(id: string):', error);
				});
	}

	ngOnInit(): void {
		console.log(`this.itemId: ${this.itemId}`);

		let inAddItemPage = false;

		if (this.itemId == '0') {
			inAddItemPage = true;
			this.showForm = true;
		}

		if (inAddItemPage) {
			this.buttonText = 'Add item';
			this.displayBlankForm();
		} else {
			// face partea de initializare partiala a formularului, cand intri pe 'edit/10010', de ex.
			this.buttonText = 'Edit item';
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
		const form = this.addItemForm.value;
		this.item.name = form.name;
		this.item.user = form.user;
		this.item.description = form.description;
		this.item.location = form.location;
		this.item.inventoryNumber = form.inventoryNumber;
		this.item.createdAt = new Date(form.createdAt);
		this.item.modifiedAt = new Date();
		this.inventoryListService.editItem(this.item);
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
