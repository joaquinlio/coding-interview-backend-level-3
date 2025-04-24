import { Item } from "../models/item.model";

export class ValidationUtil {
  static validateItemPayload(
    payload: Partial<Item>
  ): { field: string; message: string }[] {
    const errors: { field: string; message: string }[] = [];

    // Validate name
    if (!payload.name || payload.name.trim() === "") {
      errors.push({ field: "name", message: 'Field "name" is required' });
    }

    // Validate price
    if (payload.price === undefined || payload.price === null) {
      errors.push({ field: "price", message: 'Field "price" is required' });
    } else if (payload.price < 0) {
      errors.push({
        field: "price",
        message: 'Field "price" cannot be negative',
      });
    }

    return errors;
  }
}
