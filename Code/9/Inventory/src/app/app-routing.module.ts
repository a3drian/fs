import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemComponent } from './menu-items/add-item/add-item.component';
import { ContactComponent } from './menu-items/contact/contact.component';
import { InventoryComponent } from './menu-items/inventory/inventory.component';
import { ScanComponent } from './menu-items/scan/scan.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'add-item', component: AddItemComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'inventory', component: InventoryComponent },
	{ path: 'edit/:id', component: AddItemComponent },
	{ path: 'scan', component: ScanComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [
	HomePageComponent,
	AddItemComponent,
	ContactComponent,
	InventoryComponent,
	ScanComponent
];
