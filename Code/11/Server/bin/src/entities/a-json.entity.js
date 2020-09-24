"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AJson = void 0;
const mikro_orm_1 = require("mikro-orm");
const mongodb_1 = require("mongodb");
const log_1 = require("../log");
let AJson = class AJson {
    constructor(model) {
        if (!model || !(model instanceof Object)) {
            model = {};
        }
        log_1.log('(a-json.entity.ts) constructor():');
        log_1.log(`model: ${model}`);
        this.key1 = model.key1 || 'value 1';
        this['key 2'] = model['key 2'] || 'value of key 2';
    }
};
__decorate([
    mikro_orm_1.PrimaryKey(),
    __metadata("design:type", mongodb_1.ObjectId)
], AJson.prototype, "_id", void 0);
__decorate([
    mikro_orm_1.SerializedPrimaryKey(),
    __metadata("design:type", String)
], AJson.prototype, "id", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], AJson.prototype, "key1", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], AJson.prototype, "key 2", void 0);
AJson = __decorate([
    mikro_orm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], AJson);
exports.AJson = AJson;
//# sourceMappingURL=a-json.entity.js.map