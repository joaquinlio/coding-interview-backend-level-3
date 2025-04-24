import { ItemController } from "../../src/controllers/item.controller";
import { IItemService } from "../../src/services/item.service.interface";
import { Request, ResponseToolkit } from "@hapi/hapi";

describe("ItemController", () => {
  let controller: ItemController;
  let mockService: jest.Mocked<IItemService>;
  let mockResponseToolkit: ResponseToolkit;

  beforeEach(() => {
    mockService = {
      createItem: jest.fn(),
      getAllItems: jest.fn(),
      getItemById: jest.fn(),
      updateItem: jest.fn(),
      deleteItem: jest.fn(),
    };
    controller = new ItemController(mockService);

    mockResponseToolkit = {
      response: jest.fn().mockReturnValue({
        code: jest.fn(),
      }),
    } as unknown as ResponseToolkit;
  });

  it("should create an item", async () => {
    const request = { payload: { name: "Item 1", price: 10 } } as Request;
    const createdItem = { id: 1, name: "Item 1", price: 10 };

    mockService.createItem.mockResolvedValue(createdItem);

    await controller.createItem(request, mockResponseToolkit);
    expect(mockService.createItem).toHaveBeenCalledWith(request.payload);
    expect(mockResponseToolkit.response).toHaveBeenCalledWith(createdItem);
  });

  it("should get all items", async () => {
    const items = [
      { id: 1, name: "Item 1", price: 10 },
      { id: 2, name: "Item 2", price: 20 },
    ];
    mockService.getAllItems.mockResolvedValue(items);

    await controller.getAllItems({} as Request, mockResponseToolkit);
    expect(mockService.getAllItems).toHaveBeenCalled();
    expect(mockResponseToolkit.response).toHaveBeenCalledWith(items);
  });

  it("should get an item by ID", async () => {
    const item = { id: 1, name: "Item 1", price: 10 };
    const request = { params: { id: "1" } } as unknown as Request;

    mockService.getItemById.mockResolvedValue(item);

    await controller.getItemById(request, mockResponseToolkit);
    expect(mockService.getItemById).toHaveBeenCalledWith(1);
    expect(mockResponseToolkit.response).toHaveBeenCalledWith(item);
  });

  it("should return 404 if item not found by ID", async () => {
    const request = { params: { id: "1" } } as unknown as Request;

    mockService.getItemById.mockResolvedValue(null);

    await controller.getItemById(request, mockResponseToolkit);
    expect(mockService.getItemById).toHaveBeenCalledWith(1);
    expect(mockResponseToolkit.response).toHaveBeenCalledWith({
      error: "Item not found",
    });
    expect(mockResponseToolkit.response().code).toHaveBeenCalledWith(404);
  });

  it("should update an item", async () => {
    const updatedItem = { id: 1, name: "Updated Item", price: 20 };
    const request = {
      params: { id: "1" },
      payload: { name: "Updated Item", price: 20 },
    } as unknown as Request;

    mockService.updateItem.mockResolvedValue(updatedItem);

    await controller.updateItem(request, mockResponseToolkit);
    expect(mockService.updateItem).toHaveBeenCalledWith(1, request.payload);
    expect(mockResponseToolkit.response).toHaveBeenCalledWith(updatedItem);
  });

  it("should delete an item", async () => {
    const request = { params: { id: "1" } } as unknown as Request;

    mockService.deleteItem.mockResolvedValue();

    await controller.deleteItem(request, mockResponseToolkit);
    expect(mockService.deleteItem).toHaveBeenCalledWith(1);
    expect(mockResponseToolkit.response).toHaveBeenCalled();
    expect(mockResponseToolkit.response().code).toHaveBeenCalledWith(204);
  });

  it("should return 404 if deleting a non-existent item", async () => {
    const request = { params: { id: "1" } } as unknown as Request;

    mockService.deleteItem.mockRejectedValue(
      new Error("Item with ID 1 not found.")
    );

    await controller.deleteItem(request, mockResponseToolkit);
    expect(mockService.deleteItem).toHaveBeenCalledWith(1);
    expect(mockResponseToolkit.response).toHaveBeenCalledWith({
      error: "Item with ID 1 not found.",
    });
    expect(mockResponseToolkit.response().code).toHaveBeenCalledWith(404);
  });
});
