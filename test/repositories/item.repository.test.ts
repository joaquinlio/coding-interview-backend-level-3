import { ItemRepository } from "../../src/repositories/item.repository";
import pool from "../../src/utils/db.util";

jest.mock("../../src/utils/db.util");

describe("ItemRepository", () => {
  let repository: ItemRepository;

  beforeEach(() => {
    repository = new ItemRepository();
  });

  it("should create an item", async () => {
    const newItem = { name: "Item 1", price: 10 };
    const createdItem = { id: 1, ...newItem };

    (pool.query as jest.Mock).mockResolvedValue({ rows: [createdItem] });

    const result = await repository.create(newItem);
    expect(result).toEqual(createdItem);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO items (name, price) VALUES ($1, $2) RETURNING *",
      [newItem.name, newItem.price]
    );
  });

  it("should retrieve all items", async () => {
    const items = [{ id: 1, name: "Item 1", price: 10 }];
    (pool.query as jest.Mock).mockResolvedValue({ rows: items });

    const result = await repository.findAll();
    expect(result).toEqual(items);
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM items");
  });

  it("should retrieve an item by ID", async () => {
    const item = { id: 1, name: "Item 1", price: 10 };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [item] });

    const result = await repository.findById(1);
    expect(result).toEqual(item);
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM items WHERE id = $1",
      [1]
    );
  });

  it("should return null if item not found by ID", async () => {
    (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

    const result = await repository.findById(1);
    expect(result).toBeNull();
  });

  it("should update an item", async () => {
    const updatedItem = { id: 1, name: "Updated Item", price: 20 };
    (pool.query as jest.Mock).mockResolvedValue({ rows: [updatedItem] });

    const result = await repository.update(1, {
      name: "Updated Item",
      price: 20,
    });
    expect(result).toEqual(updatedItem);
    expect(pool.query).toHaveBeenCalledWith(
      `
      UPDATE items
      SET name = COALESCE($1, name),
          price = COALESCE($2, price)
      WHERE id = $3
      RETURNING *`,
      ["Updated Item", 20, 1]
    );
  });

  it("should delete an item", async () => {
    (pool.query as jest.Mock).mockResolvedValue({});

    await repository.delete(1);
    expect(pool.query).toHaveBeenCalledWith("DELETE FROM items WHERE id = $1", [
      1,
    ]);
  });
});
