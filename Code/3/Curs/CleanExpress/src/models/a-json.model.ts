// pentru ca folosim 'export class'
// module.exports.aJsonModel = aJsonModel;

// we can construct objects multiple ways, two of which are shown below

// o scoatem pentru ca vom lucra cu 'class'
// function return
// function aJsonModel(model = {}) {
// 	return {
// 		key1: model.key1 || "value 1",
// 		"key 2": model["key 2"] || "value 2"
// 	};
// }

// newable classes
// permis de Typescript
// export ne scapa de prima si ultima linie de cod
export class AJsonModel {
	// declaram 2 proprietati pentru ca le apelam in constructor
	key1: String;
	"key 2": String;
	constructor(model: any = {}) {	// sa scapam de eroarea de la 'model.key1', am pus 'model: any'
		this.key1 = model.key1 || "value 1";
		this["key 2"] = model["key 2"] || "value 2";
	}
}

// a "gotcha" for class though is that it can be added to exports only after the implementation
// module.exports.AJsonModel = AJsonModel;

