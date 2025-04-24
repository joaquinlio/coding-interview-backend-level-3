import { server as hapiServer } from "@hapi/hapi";
import { ItemRepository } from "./repositories/item.repository";
import { ItemService } from "./services/item.service";
import { ItemController } from "./controllers/item.controller";
import { registerItemRoutes } from "./routes/item.routes";
import { registerPingRoutes } from "./routes/ping.routes";
import pool from "./utils/db.util";

const getServer = async () => {
  const server = hapiServer({
    host: "localhost",
    port: 3000,
  });

  // Initialize repository, service, and controller
  const repository = new ItemRepository();
  const service = new ItemService(repository);
  const controller = new ItemController(service);

  // Register routes
  registerItemRoutes(server, controller);
  registerPingRoutes(server);

  return server;
};

export const initializeServer = async () => {
  // Clean up the database before starting the server
  await pool.query("TRUNCATE TABLE items RESTART IDENTITY CASCADE");
  const server = await getServer();
  await server.initialize();
  return server;
};

export const startServer = async () => {
  const server = await getServer();
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
};
