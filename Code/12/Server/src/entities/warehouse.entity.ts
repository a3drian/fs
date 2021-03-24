import {
	Entity,
	MongoEntity,
	SerializedPrimaryKey,
	PrimaryKey,
	Property,
} from 'mikro-orm';
import { ObjectId } from 'mongodb';

import { IWarehouse } from 'inventory-interfaces/IWarehouse';
import { IAddress } from 'inventory-interfaces/IAddress';

@Entity()
export class Warehouse implements MongoEntity<Warehouse>, IWarehouse {

	@PrimaryKey()
	_id!: ObjectId;

	@SerializedPrimaryKey()
	id!: string;

	@Property()
	info: string;

	@Property()
	phone: string;

	@Property()
	openDays: string;

	@Property()
	schedule: string;

	@Property()
	address: IAddress;

	@Property()
	active: boolean;

	public constructor(init?: Partial<Warehouse>) {
		Object.assign(this, init);
	}

}
