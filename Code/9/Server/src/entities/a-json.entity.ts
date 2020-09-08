import { Entity, MongoEntity, SerializedPrimaryKey, PrimaryKey, Property } from 'mikro-orm';
import { ObjectId } from 'mongodb';
import { log } from '../log';

@Entity()
export class AJson implements MongoEntity<AJson> {
	@PrimaryKey()
	_id!: ObjectId;

	@SerializedPrimaryKey()
	id!: string;

	@Property()
	key1!: string;

	@Property()
	'key 2'!: string;

	constructor(model?: Partial<AJson>) {
		if (!model || !(model instanceof Object)) {
			model = <AJson><any>{};
		}

		log('(a-json.entity.ts) constructor():');
		log(`model: ${model}`);

		this.key1 = model.key1 || 'value 1';
		this['key 2'] = model['key 2'] || 'value of key 2';
	}
}
