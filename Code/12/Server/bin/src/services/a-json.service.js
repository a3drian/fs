"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAJson = exports.getAJson = void 0;
const a_json_entity_1 = require("../entities/a-json.entity");
const mikro_orm_1 = require("mikro-orm");
const log_1 = require("../log");
async function getAJson(em, key1) {
    log_1.log('(a-json.service.ts) getAJson():');
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        log_1.log('invalid request');
        return Error('invalid request');
    }
    if (!key1 || typeof key1 !== 'string') {
        log_1.log('invalid params');
        return Error('invalid params');
    }
    try {
        const aJson = await em.findOne(a_json_entity_1.AJson, { key1 });
        return aJson;
    }
    catch (ex) {
        return ex;
    }
}
exports.getAJson = getAJson;
async function saveAJson(em, aJson) {
    log_1.log('(a-json.service.ts) saveAJson():');
    if (!(em instanceof mikro_orm_1.EntityManager)) {
        return Error('invalid request');
    }
    if (!aJson || typeof aJson !== 'object' || !aJson.key1) {
        return Error('invalid params');
    }
    try {
        const aJsonExists = await em.findOne(a_json_entity_1.AJson, {
            key1: aJson.key1
        });
        if (aJsonExists) {
            log_1.log(`(a-json.service.ts) aJsonExists: ${aJsonExists.key1}`);
            return Error('item already exists');
        }
    }
    catch (ex) {
        return ex;
    }
    const jsonModel = new a_json_entity_1.AJson({
        key1: aJson.key1,
        'key 2': aJson['key 2']
    });
    try {
        await em.persistAndFlush([jsonModel]);
    }
    catch (ex) {
        return ex;
    }
    return jsonModel;
}
exports.saveAJson = saveAJson;
//# sourceMappingURL=a-json.service.js.map