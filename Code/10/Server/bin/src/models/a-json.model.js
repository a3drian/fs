"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AJsonModel = void 0;
const log_1 = require("../log");
class AJsonModel {
    constructor(model) {
        log_1.log('(a-json.model.ts) constructor():');
        log_1.log(`model: ${model}`);
        if (model) {
            this.key1 = model.key1;
            this['key 2'] = model['key 2'];
        }
        else {
            this.key1 = 'value 1';
            this['key 2'] = 'value 2';
        }
    }
}
exports.AJsonModel = AJsonModel;
//# sourceMappingURL=a-json.model.js.map