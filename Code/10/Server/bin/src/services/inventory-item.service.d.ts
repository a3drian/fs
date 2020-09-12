import { InventoryItem } from '../entities/inventory-item.entity';
import { EntityManager } from 'mikro-orm';
export { getInventoryItems, getInventoryItem, updateInventoryItem, addInventoryItem, removeInventoryItem, countInventoryItems };
declare function countInventoryItems(em: EntityManager, activeOnly?: boolean): Promise<any>;
declare function getInventoryItems(em: EntityManager, page: number, limit: number, sort: string, activeOnly: boolean): Promise<Error | InventoryItem[]>;
declare function getInventoryItem(em: EntityManager, id: string): Promise<Error | InventoryItem | null>;
declare function removeInventoryItem(em: EntityManager, id: string): Promise<Error | void>;
declare function updateInventoryItem(em: EntityManager, inventoryItem: Partial<InventoryItem>, id: string): Promise<Error | InventoryItem>;
declare function addInventoryItem(em: EntityManager, inventoryItem: Partial<InventoryItem>): Promise<Error | InventoryItem>;
