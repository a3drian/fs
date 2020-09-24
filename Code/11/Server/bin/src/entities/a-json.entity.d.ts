import { MongoEntity } from 'mikro-orm';
import { ObjectId } from 'mongodb';
export declare class AJson implements MongoEntity<AJson> {
    _id: ObjectId;
    id: string;
    key1: string;
    'key 2': string;
    constructor(model?: Partial<AJson>);
}
