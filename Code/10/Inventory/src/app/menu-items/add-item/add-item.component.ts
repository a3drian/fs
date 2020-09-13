import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryItem } from '../../app-logic/inventory-item';
import { Router, ActivatedRoute } from '@angular/router';
// 8:
import { InventoryListService } from '../../app-logic/inventory-list.service';
// 9:
import jsPDF from 'jspdf';

@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

	addItemForm: FormGroup;
	item: InventoryItem;
	itemId: string;
	showForm = false;
	buttonText = '';
	idNotFound = false;

	constructor(
		private inventoryListService: InventoryListService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {

		this.activatedRoute.params.subscribe(
			(params) => {
				console.log('params:', params);
				this.itemId = params.id ? params.id : '0';
			}
		);

		if (this.itemId === '0') {
		} else {
			this.inventoryListService
				.getDataById(this.itemId)
				.subscribe(
					(data) => {
						console.log('constructor() data:', data);
						this.idNotFound = false;
						console.log('constructor(), (data), this.idNotFound:', this.idNotFound);
					},
					(error) => {
						console.log('constructor(), (error), error:', error);
						if (error.status === 404) {
							this.idNotFound = true;
						}
						console.log('constructor(), (error) this.idNotFound:', this.idNotFound);
					}
				);
		}
	}

	// all the input forms are left blank
	displayBlankForm(): void {

		const today: Date = new Date();

		console.log('displayEmptyForm():');
		this.item = new InventoryItem();

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

	// pre-populates the form using information from the 'item' retrieved from the service
	displayItemInForm(): void {

		console.log('displayItemInForm():');

		this.inventoryListService.getDataById(this.itemId)
			.subscribe(
				(data) => {
					console.log('displayItemInForm(), data:', data);
					this.item = new InventoryItem(
						{
							id: data.id,
							name: data.name,
							user: data.user,
							location: data.location,
							inventoryNumber: data.inventoryNumber,
							description: data.description,
							createdAt: new Date(data.createdAt),
							modifiedAt: new Date(),
							active: data.active
						});
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

				},
				(error) => {
					console.log('(error) displayItemInForm(id: string):', error);
				});
	}

	ngOnInit(): void {
		console.log(`this.itemId: ${this.itemId}`);

		let inAddItemPage = false;

		if (this.itemId === '0') {
			inAddItemPage = true;
			this.showForm = true;
		}

		if (inAddItemPage) {

			this.buttonText = 'Add item';
			this.displayBlankForm();

		} else {

			// face partea de initializare partiala a formularului, cand intri pe 'edit/10010', de ex.
			this.buttonText = 'Edit item';

			setTimeout(
				() => {
					console.log('1 second timeout');

					console.log('ngOnInit() this.idNotFound:', this.idNotFound);
					if (!this.idNotFound) {
						this.displayItemInForm();
					}

				}, 1000);
		}
	}

	addNewItem(): void {
		console.log('addNewItem():');
		const form = this.addItemForm.value;
		this.item = new InventoryItem(
			{
				// id: '',
				name: form.name,
				user: form.user,
				location: form.location,
				inventoryNumber: form.inventoryNumber,
				description: form.description,
				createdAt: new Date(form.createdAt),
				modifiedAt: new Date(),
				active: true
			}
		);
		this.inventoryListService
			.addItem(this.item)
			.subscribe(
				() => {
					this.router.navigate(['/inventory']);
				}
			);
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

		this.inventoryListService
			.editItem(this.item)
			.subscribe(
				() => {
					this.router.navigate(['/inventory']);
				}
			);
	}

	onSubmit(): void {
		console.log('onSubmit():');

		// trebuie sa testam daca avem deja sau nu acest id in array
		if (this.itemId === '0') {
			this.addNewItem();
		} else {
			this.editExistingItem();
		}
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addItemForm.controls[controlName].hasError(errorName);
	}

	showQRCode(): boolean {
		if (this.itemId === '0' || !this.showForm) {
			return false;
		}
		return true;
	}

	getBase64Image(img: any): string {
		console.log('img:', img);
		const canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		const dataURL = canvas.toDataURL('image/png');
		return dataURL;
	}

	downloadQRCode(): void {

		const qrcode = document.getElementById('qrcode');
		const doc = new jsPDF();

		console.log('qrcode.firstChild:', qrcode.firstChild);
		console.log('qrcode.firstChild.firstChild:', qrcode.firstChild.firstChild);
		const canvas = qrcode.firstChild.firstChild;
		const imageData = this.getBase64Image(canvas);

		doc.addImage(imageData, 'png', 0, 0, 128, 128);

		doc.save(`${this.itemId}.pdf`);
	}

}
