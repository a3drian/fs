// const aJsonData = require("../data/a-json.data");
import * as aJsonData from "../data/a-json.data"; // in loc de 'require'

// pentru ca folosim 'import'
// module.exports.getAJson = getAJson;

// function getAJson() {
const getAJson = function () {
	// get the data from the persistence; this can be from memory, a file on disk, a db
	// validate data, aggregate it, return it
	return aJsonData.getAJson();
};

export { getAJson };
