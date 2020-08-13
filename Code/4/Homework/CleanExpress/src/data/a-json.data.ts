import { AJsonModel } from '../models/a-json.model';
import { log } from '../log';

const getAJson = function () {

	log('(a-json.data.ts) getAJson():');

	const obj = {
		key1: 'value 1',
		// 'key 2': 'value 2',	// 'key 2' is excluded on purpose, this is a valid case where the data may not contain it
		nonExistingModelProp: 'who cares'	// key does not exist in the model, but the data may contain it
	};

	const ret = new AJsonModel(obj);

	return ret;
};

export { getAJson };
