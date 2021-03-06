require('dotenv').config();
console.log(require('dotenv').config());

const CLUSTER_URI = process.env.ENV_MONGO_URI;

export const env = Object.freeze({
	PORT: process.env.PORT || 8080,

	NODE_ENV: 'development',

	MONGO_URL: CLUSTER_URI,
	DB_NAME: 'inventory',

	DISCOVERY_CLIENT_ROUTE: '/discovery/client',
	A_JSON_ROUTE: '/api/json',
	INVENTORY_ITEMS_ROUTE: '/api/inventory-items',
	WAREHOUSES_ROUTE: '/api/warehouses'
});
