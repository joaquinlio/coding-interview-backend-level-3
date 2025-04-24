import pool from "../utils/db.util";
import { Item } from "../models/item.model";
import { IRepository } from "./repository.interface";

export class ItemRepository implements IRepository<Item> {
  /**
   * Creates a new item in the database.
   * @param item - The item to create, excluding the `id` property.
   * @returns A promise that resolves to the created item, including its generated `id`.
   */
  async create(item: Omit<Item, "id">): Promise<Item> {
    const query = "INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *";
    const values = [item.name, item.price];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Retrieves all items from the database.
   * @returns A promise that resolves to an array of all items.
   */
  async findAll(): Promise<Item[]> {
    const query = "SELECT * FROM items";
    const result = await pool.query(query);
    return result.rows;
  }

  /**
   * Finds an item in the database by its ID.
   * @param id - The ID of the item to retrieve.
   * @returns A promise that resolves to the item if found, or `null` if not found.
   */
  async findById(id: number): Promise<Item | null> {
    const query = "SELECT * FROM items WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  /**
   * Updates an existing item in the database.
   * @param id - The ID of the item to update.
   * @param item - A partial object containing the fields to update.
   * @returns A promise that resolves to the updated item if successful, or `null` if the item does not exist.
   */
  async update(id: number, item: Partial<Item>): Promise<Item | null> {
    const query = `
      UPDATE items
      SET name = COALESCE($1, name),
          price = COALESCE($2, price)
      WHERE id = $3
      RETURNING *`;
    const values = [item.name, item.price, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  /**
   * Deletes an item from the database by its ID.
   * @param id - The ID of the item to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  async delete(id: number): Promise<void> {
    const query = "DELETE FROM items WHERE id = $1";
    const values = [id];
    await pool.query(query, values);
  }
}
