// const aJsonModel = require("../models/a-json.model");
import { AJsonModel } from "../models/a-json.model"; // in loc de 'require'
// cu 'A' mare pentru ca instantam clasa, nu o instanta a clasei

// module.exports.getAJson = getAJson;

// function getAJson() {
const getAJson = function () {
	// get data
	const obj = {
		key1: "value 1",
		// "key 2": "value 2", // "key 2" is excluded on purpose, this is a valid case where the data may not contain it
		nonExistingModelProp: "who cares"	// key does not exist in the model, but the data may contain it
	};

	// construct the model from data, using either the function or class, whichever style you implemented
	// let ret = aJsonModel.aJsonModel(obj);
	// ret = new aJsonModel.AJsonModel(obj);
	// vom folosi 'new' pentru ca lucram cu clase:
	const ret = new AJsonModel(obj); 	// folosind lint primim: Identifier 'ret' is never reassigned; use 'const' instead of 'let' => punem const in loc de let

	return ret;
};

// dam export la functia de mai sus
export { getAJson };
