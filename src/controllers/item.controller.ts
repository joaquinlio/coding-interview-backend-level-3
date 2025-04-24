import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { IItemService } from "../services/item.service.interface";
import { Item } from "../models/item.model";

export class ItemController {
  private service: IItemService;

  constructor(service: IItemService) {
    this.service = service;
  }

  async createItem(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const item = request.payload as Omit<Item, "id">;
      const createdItem = await this.service.createItem(item);
      return h.response(createdItem).code(201); // HTTP 201 Created
    } catch (error: any) {
      // Handle validation errors
      if (error.message.startsWith("[")) {
        return h.response({ errors: JSON.parse(error.message) }).code(400); // HTTP 400 Bad Request
      }
      return h.response({ error: error.message }).code(400); // HTTP 400 Bad Request
    }
  }

  async getAllItems(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const items = await this.service.getAllItems();
      return h.response(items).code(200); // HTTP 200 OK
    } catch (error: any) {
      return h.response({ error: error.message }).code(500); // HTTP 500 Internal Server Error
    }
  }

  async getItemById(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const id = parseInt(request.params.id, 10);
      const item = await this.service.getItemById(id);
      if (!item) {
        return h.response({ error: "Item not found" }).code(404); // HTTP 404 Not Found
      }
      return h.response(item).code(200); // HTTP 200 OK
    } catch (error: any) {
      return h.response({ error: error.message }).code(404); // HTTP 404 Not Found
    }
  }

  async updateItem(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const id = parseInt(request.params.id, 10);
      const item = request.payload as Partial<Item>;
      const updatedItem = await this.service.updateItem(id, item);
      if (!updatedItem) {
        return h
          .response({ error: "Failed to update item or item not found" })
          .code(400); // HTTP 400 Bad Request
      }
      return h.response(updatedItem).code(200); // HTTP 200 OK
    } catch (error: any) {
      // Handle validation errors
      if (error.message.startsWith("[")) {
        return h.response({ errors: JSON.parse(error.message) }).code(400); // HTTP 400 Bad Request
      }
      return h.response({ error: error.message }).code(400); // HTTP 400 Bad Request
    }
  }

  async deleteItem(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const id = parseInt(request.params.id, 10);
      await this.service.deleteItem(id);
      return h.response().code(204); // HTTP 204 No Content
    } catch (error: any) {
      return h.response({ error: error.message }).code(404); // HTTP 404 Not Found
    }
  }
}
