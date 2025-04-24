import { startServer } from "./server";
import { initializeDatabase } from "./utils/db.util";

initializeDatabase().then(() => {
  startServer().catch((error) => {
    console.error("Error starting server:", error);
  });
});
