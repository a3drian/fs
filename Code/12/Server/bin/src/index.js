"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const app_1 = require("./app");
const log_1 = require("./log");
app_1.makeApp()
    .then((app) => app
    .listen(env_1.env.PORT, () => {
    console.log('connected to MongoDB');
    log_1.log(`${env_1.env.NODE_ENV} server listening on port ${env_1.env.PORT}`);
}))
    .catch((error) => {
    log_1.log(`(index.ts) error: ${error}`);
});
log_1.log('');
//# sourceMappingURL=index.js.map