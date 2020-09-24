import { MongoEntity } from 'mikro-orm';
import { ObjectId } from 'mongodb';
import { IInventoryItem } from 'inventory-interfaces/IInventoryItem';
export declare class InventoryItem implements MongoEntity<InventoryItem>, IInventoryItem {
    _id: ObjectId;
    id: string;
    name: string;
    description: string;
    user: string;
    location: string;
    inventoryNumber: number;
    createdAt: Date;
    modifiedAt: Date;
    active: boolean;
    constructor(init?: Partial<InventoryItem>);
}
