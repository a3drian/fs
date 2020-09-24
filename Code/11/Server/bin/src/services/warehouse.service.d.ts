import { Warehouse } from '../entities/warehouse.entity';
import { EntityManager } from 'mikro-orm';
export { getWarehouses, getWarehouse, updateWarehouse, addWarehouse, removeWarehouse, countWarehouses };
declare function countWarehouses(em: EntityManager, activeOnly?: boolean): Promise<any>;
declare function getWarehouses(em: EntityManager, page: number, limit: number, sort: string, activeOnly: boolean): Promise<Error | Warehouse[]>;
declare function getWarehouse(em: EntityManager, id: string): Promise<Error | Warehouse | null>;
declare function removeWarehouse(em: EntityManager, id: string): Promise<Error | void>;
declare function updateWarehouse(em: EntityManager, warehouse: Partial<Warehouse>, id: string): Promise<Error | Warehouse>;
declare function addWarehouse(em: EntityManager, warehouse: Partial<Warehouse>): Promise<Error | Warehouse>;
