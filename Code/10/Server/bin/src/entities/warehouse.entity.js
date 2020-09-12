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
exports.Warehouse = void 0;
const mikro_orm_1 = require("mikro-orm");
const mongodb_1 = require("mongodb");
let Warehouse = class Warehouse {
    constructor(init) {
        Object.assign(this, init);
    }
};
__decorate([
    mikro_orm_1.PrimaryKey(),
    __metadata("design:type", mongodb_1.ObjectId)
], Warehouse.prototype, "_id", void 0);
__decorate([
    mikro_orm_1.SerializedPrimaryKey(),
    __metadata("design:type", String)
], Warehouse.prototype, "id", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Warehouse.prototype, "info", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Warehouse.prototype, "phone", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Warehouse.prototype, "openDays", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", String)
], Warehouse.prototype, "schedule", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Object)
], Warehouse.prototype, "address", void 0);
__decorate([
    mikro_orm_1.Property(),
    __metadata("design:type", Boolean)
], Warehouse.prototype, "active", void 0);
Warehouse = __decorate([
    mikro_orm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Warehouse);
exports.Warehouse = Warehouse;
//# sourceMappingURL=warehouse.entity.js.map