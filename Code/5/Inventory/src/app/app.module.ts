import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

import { WarehouseService } from './app-logic/warehouse/warehouse.service';
import { WarehouseDetailComponent } from './menu-items/contact/warehouse-detail/warehouse-detail.component';

import { InventoryItemService } from './app-logic/inventory-item/inventory-item.service';
import { InventoryItemDetailComponent } from './menu-items/inventory/inventory-item-detail/inventory-item-detail.component';

@NgModule({
	declarations: [
		AppComponent,
		RoutingComponent,
		WarehouseDetailComponent,
		InventoryItemDetailComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [
		WarehouseService,
		InventoryItemService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
