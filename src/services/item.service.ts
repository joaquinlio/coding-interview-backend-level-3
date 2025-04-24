import { Item } from "../models/item.model";
import { IItemService } from "./item.service.interface";
import { IRepository } from "../repositories/repository.interface";
import { ValidationUtil } from "../utils/validation.util";

export class ItemService implements IItemService {
  private repository: IRepository<Item>;

  constructor(repository: IRepository<Item>) {
    this.repository = repository;
  }

  async createItem(item: Omit<Item, "id">): Promise<Item> {
    // Validate the payload
    const errors = ValidationUtil.validateItemPayload(item);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    // Create the item
    return this.repository.create(item);
  }

  async getAllItems(): Promise<Item[]> {
    return this.repository.findAll();
  }

  async getItemById(id: number): Promise<Item | null> {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new Error(`Item with ID ${id} not found.`);
    }
    return item;
  }

  async updateItem(id: number, item: Partial<Item>): Promise<Item | null> {
    // Validate the payload
    const errors = ValidationUtil.validateItemPayload(item);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    // Update the item
    const updatedItem = await this.repository.update(id, item);
    if (!updatedItem) {
      throw new Error(`Item with ID ${id} not found.`);
    }
    return updatedItem;
  }

  async deleteItem(id: number): Promise<void> {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new Error(`Item with ID ${id} not found.`);
    }
    await this.repository.delete(id);
  }
}
