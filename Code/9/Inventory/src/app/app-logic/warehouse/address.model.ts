export class Address {
	line1: string;
	line2?: string;
	town: string;
	county: string;
	postcode: string;

	constructor({ line1, line2, town, county, postcode }:
		{ line1: string; line2?: string; town: string; county: string; postcode: string; }) {
		this.line1 = line1;
		this.line2 = line2 ? line2 : '';
		this.town = town;
		this.county = county;
		this.postcode = postcode;
	}

	tostring(): string {
		if (this.line2 === '') {
			return `${this.line1}, ${this.town}, ${this.county}, ${this.postcode}`;
		} else {
			return `${this.line1}, ${this.line2}, ${this.town}, ${this.county}, ${this.postcode}`;
		}
	}
}
