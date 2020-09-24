import { MongoEntity } from 'mikro-orm';
import { ObjectId } from 'mongodb';
import { IWarehouse } from 'inventory-interfaces/IWarehouse';
import { IAddress } from 'inventory-interfaces/IAddress';
export declare class Warehouse implements MongoEntity<Warehouse>, IWarehouse {
    _id: ObjectId;
    id: string;
    info: string;
    phone: string;
    openDays: string;
    schedule: string;
    address: IAddress;
    active: boolean;
    constructor(init?: Partial<Warehouse>);
}
