"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
exports.log = function (message) {
    if (message instanceof Error) {
        // tslint:disable:no-eval
        eval(`console.error("${String(message)}")`);
        // tslint:enable
    }
    else {
        // tslint:disable:no-eval
        eval(`console.log("${message}")`);
        // tslint:enable
    }
};
//# sourceMappingURL=log.js.map