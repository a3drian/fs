import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
	selector: 'app-scan',
	templateUrl: './scan.component.html',
	styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

	torchEnabled = false;
	tryHarder = false;
	currentDevice: MediaDeviceInfo = null;
	formats = [BarcodeFormat.QR_CODE];
	availableDevice: MediaDeviceInfo[];
	hasPermission = false;

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	onPermissionResponse(permission: boolean) {
		console.log('Camera permission:', permission);
		this.hasPermission = permission;
	}

	onCamerasFound(devices: MediaDeviceInfo[]) {
		devices.forEach((device) => {
			console.log('Camera device:', device.label);
		})
		this.availableDevice = devices;
	}

	onScanSuccess(data: string) {
		console.log('Data from QR:', data);
		this.router.navigate[`/item/${data}`];
	}

}
