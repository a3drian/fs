import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

import { WarehouseService } from './app-logic/warehouse/warehouse.service';

// material:
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
// buttons:
import { MatButtonModule } from '@angular/material/button';
// forms:
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
// HTTP:
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
// Toggle:
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
	declarations: [
		AppComponent,
		RoutingComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		HttpClientModule,
		MatProgressSpinnerModule,
		MatIconModule,
		MatSlideToggleModule,
		MatToolbarModule,
		MatProgressBarModule
	],
	providers: [
		WarehouseService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
