"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAJson = void 0;
const a_json_model_1 = require("../models/a-json.model");
const log_1 = require("../log");
const getAJson = function () {
    log_1.log('(a-json.data.ts) getAJson():');
    const obj = {
        key1: 'value 1',
        // 'key 2': 'value 2',	// 'key 2' is excluded on purpose, this is a valid case where the data may not contain it
        nonExistingModelProp: 'who cares' // key does not exist in the model, but the data may contain it
    };
    const ret = new a_json_model_1.AJsonModel(obj);
    return ret;
};
exports.getAJson = getAJson;
//# sourceMappingURL=a-json.data.js.map