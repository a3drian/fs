export class AJsonModel {
	// declaram 2 proprietati pentru ca le apelam in constructor
	key1: String;
	"key 2": String;
	constructor(model?: any) {
		if (model) {
			this.key1 = model.key1;
			this["key 2"] = model["key 2"];
		} else {
			this.key1 = "value 1";
			this["key 2"] = "value 2";
		}
	}
}
