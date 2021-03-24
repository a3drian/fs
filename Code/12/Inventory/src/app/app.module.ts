import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
// QRCode:
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ShowItemComponent } from './menu-items/show-item/show-item.component';
// print:
import { NgxPrintModule } from 'ngx-print';

@NgModule({
	declarations: [
		AppComponent,
		RoutingComponent,
		ShowItemComponent
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
		MatProgressBarModule,
		LayoutModule,
		MatSidenavModule,
		MatListModule,
		QRCodeModule,
		ZXingScannerModule,
		NgxPrintModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
