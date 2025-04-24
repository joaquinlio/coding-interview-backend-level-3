import { Item } from "../models/item.model";

export interface IItemService {
  createItem(item: Omit<Item, "id">): Promise<Item>;
  getAllItems(): Promise<Item[]>;
  getItemById(id: number): Promise<Item | null>;
  updateItem(id: number, item: Partial<Item>): Promise<Item | null>;
  deleteItem(id: number): Promise<void>;
}
