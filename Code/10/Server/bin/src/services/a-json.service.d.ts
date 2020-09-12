import { AJson } from '../entities/a-json.entity';
import { EntityManager } from 'mikro-orm';
export { getAJson, saveAJson };
declare function getAJson(em: EntityManager, key1: string): Promise<Error | AJson | null>;
declare function saveAJson(em: EntityManager, aJson: Partial<AJson>): Promise<Error | AJson>;
