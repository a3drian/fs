export class Address {
	line1: String;
	line2?: String;
	town: String;
	county: String;
	postcode: String;

	// constructor(
	// 	line1: String,
	// 	town: String,
	// 	county: String,
	// 	postcode: String,
	// 	line2?: String
	// ) {
	// 	this.line1 = line1;
	// 	this.line2 = line2;
	// 	this.town = town;
	// 	this.county = county;
	// 	this.postcode = postcode;
	// }

	constructor({ line1, line2, town, county, postcode }:
		{ line1: String; line2?: String; town: String; county: String; postcode: String; }) {
		this.line1 = line1;
		this.line2 = line2 ? line2 : '';
		this.town = town;
		this.county = county;
		this.postcode = postcode;
	}

	toString() {
		return `${this.line1} ${this.line2} ${this.town}, ${this.county}, ${this.postcode}`;
	}
}