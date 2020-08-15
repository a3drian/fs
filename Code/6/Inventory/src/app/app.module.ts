import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

import { WarehouseService } from './app-logic/warehouse/warehouse.service';
import { WarehouseDetailComponent } from './menu-items/contact/warehouse-detail/warehouse-detail.component';

import { InventoryItemService } from './app-logic/inventory-item/inventory-item.service';
import { InventoryItemDetailComponent } from './menu-items/inventory/inventory-item-detail/inventory-item-detail.component';

// material:
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
// buttons:
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [
		AppComponent,
		RoutingComponent,
		WarehouseDetailComponent,
		InventoryItemDetailComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatButtonModule
	],
	providers: [
		WarehouseService,
		InventoryItemService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
