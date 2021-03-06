"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require('dotenv').config();
console.log(require('dotenv').config());
const CLUSTER_URI = process.env.ENV_MONGO_URI;
exports.env = Object.freeze({
    PORT: process.env.PORT || 8080,
    NODE_ENV: 'development',
    MONGO_URL: CLUSTER_URI,
    DB_NAME: 'inventory',
    INVENTORY_ITEMS_ROUTE: '/api/inventory-items',
    WAREHOUSES_ROUTE: '/api/warehouses'
});
//# sourceMappingURL=env.js.map