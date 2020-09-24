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
	showCamera = false;
	cameraLoaded = false;
	hasDevices = false;
	error: string;

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	onPermissionResponse(permission: boolean): void {
		console.log('Camera permission:', permission);
		this.hasPermission = permission;
		setTimeout(
			() => {
				this.cameraLoaded = true;
			}, 1000);
	}

	onCamerasFound(devices: MediaDeviceInfo[]): void {
		devices.forEach(
			(device) => {
				console.log('Camera device:', device.label);
			}
		);
		this.availableDevice = devices;
	}

	onScanSuccess(id: string): void {
		console.log('Data from QR:', id);
		this.router.navigate([`/item/${id}`]);
	}

	enableCamera(): void {
		this.showCamera = !this.showCamera;
	}

	onHasDevices(hasDevices: boolean): void {
		console.log('hasDevices:', hasDevices);
		this.hasDevices = hasDevices;
	}

	showError(): boolean {
		if (!this.hasDevices) {
			this.error = 'Unable to find suitable camera device.';
			return true;
		}
		if (!this.hasPermission) {
			this.error = 'Unable to set camera permission.';
			return true;
		}
		return false;
	}

}
