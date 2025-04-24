import { ItemService } from "../../src/services/item.service";
import { IRepository } from "../../src/repositories/repository.interface";
import { Item } from "../../src/models/item.model";

describe("ItemService", () => {
  let service: ItemService;
  let mockRepository: jest.Mocked<IRepository<Item>>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new ItemService(mockRepository);
  });

  it("should create an item", async () => {
    const newItem = { name: "Item 1", price: 10 };
    const createdItem = { id: 1, ...newItem };

    mockRepository.create.mockResolvedValue(createdItem);

    const result = await service.createItem(newItem);
    expect(result).toEqual(createdItem);
    expect(mockRepository.create).toHaveBeenCalledWith(newItem);
  });

  it("should retrieve all items", async () => {
    const items = [{ id: 1, name: "Item 1", price: 10 }];
    mockRepository.findAll.mockResolvedValue(items);

    const result = await service.getAllItems();
    expect(result).toEqual(items);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it("should retrieve an item by ID", async () => {
    const item = { id: 1, name: "Item 1", price: 10 };
    mockRepository.findById.mockResolvedValue(item);

    const result = await service.getItemById(1);
    expect(result).toEqual(item);
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
  });

  it("should throw an error if item not found by ID", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.getItemById(1)).rejects.toThrow(
      "Item with ID 1 not found."
    );
  });

  it("should update an item", async () => {
    const updatedItem = { id: 1, name: "Updated Item", price: 20 };
    mockRepository.update.mockResolvedValue(updatedItem);

    const result = await service.updateItem(1, {
      name: "Updated Item",
      price: 20,
    });
    expect(result).toEqual(updatedItem);
    expect(mockRepository.update).toHaveBeenCalledWith(1, {
      name: "Updated Item",
      price: 20,
    });
  });

  it("should delete an item", async () => {
    mockRepository.findById.mockResolvedValue({
      id: 1,
      name: "Item 1",
      price: 10,
    });
    mockRepository.delete.mockResolvedValue();

    await service.deleteItem(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it("should throw an error if deleting a non-existent item", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(service.deleteItem(1)).rejects.toThrow(
      "Item with ID 1 not found."
    );
  });
});
