"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDiscoveryClientRoute = void 0;
const env_1 = require("../env");
function setDiscoveryClientRoute(router) {
    router.get('/', getdiscoveryClient);
    return router;
}
exports.setDiscoveryClientRoute = setDiscoveryClientRoute;
function getdiscoveryClient(_req, res, next) {
    try {
        const clientSettings = {
            jsonRoute: env_1.env.A_JSON_ROUTE
        };
        return res.json(clientSettings);
    }
    catch (ex) {
        return next(ex);
    }
}
//# sourceMappingURL=discovery-client.route.js.map