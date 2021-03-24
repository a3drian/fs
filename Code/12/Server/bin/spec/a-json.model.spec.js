"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_json_model_1 = require("../src/models/a-json.model");
describe('a-json-model', () => {
    describe('aJsonModel', () => {
        it('init with undefined', () => {
            const model = new a_json_model_1.AJsonModel();
            expect(model).toBeDefined();
            expect(model.key1).toBe('value 1');
        });
        it('init with key1', () => {
            const value1 = 'abc';
            const model = new a_json_model_1.AJsonModel({ key1: value1 });
            expect(model).toBeDefined();
            expect(model.key1).toBe(value1);
        });
        it('init with non existing key', () => {
            const nonExistingKeyName = 'nonExistingKey';
            const inputModel = {};
            inputModel[nonExistingKeyName] = 'random';
            const model = new a_json_model_1.AJsonModel(inputModel);
            expect(model).toBeDefined();
            expect(model[nonExistingKeyName]).not.toBeDefined();
        });
    });
    describe('AJsonModel', () => {
        it('should work exactly like above', function constructor() {
            const model = new a_json_model_1.AJsonModel();
            expect(model).toBeDefined();
            expect(model.key1).toBe('value 1');
        });
    });
});
//# sourceMappingURL=a-json.model.spec.js.map