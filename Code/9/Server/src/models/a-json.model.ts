import { log } from '../log';

export class AJsonModel {
	key1: String;
	'key 2': String;

	constructor(model?: any) {

		log('(a-json.model.ts) constructor():');
		log(`model: ${model}`);

		if (model) {
			this.key1 = model.key1;
			this['key 2'] = model['key 2'];
		} else {
			this.key1 = 'value 1';
			this['key 2'] = 'value 2';
		}
	}
}
