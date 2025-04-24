import { Server } from "@hapi/hapi";
import { ItemController } from "../controllers/item.controller";

export const registerItemRoutes = (
  server: Server,
  controller: ItemController
): void => {
  server.route([
    {
      method: "POST",
      path: "/items",
      handler: controller.createItem.bind(controller),
    },
    {
      method: "GET",
      path: "/items",
      handler: controller.getAllItems.bind(controller),
    },
    {
      method: "GET",
      path: "/items/{id}",
      handler: controller.getItemById.bind(controller),
    },
    {
      method: "PUT",
      path: "/items/{id}",
      handler: controller.updateItem.bind(controller),
    },
    {
      method: "DELETE",
      path: "/items/{id}",
      handler: controller.deleteItem.bind(controller),
    },
  ]);
};
