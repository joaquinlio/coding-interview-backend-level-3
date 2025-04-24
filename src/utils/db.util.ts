import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectionString =
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL;

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString,
});

// Create the items table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL CHECK (price >= 0)
  );
`;

export const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    client.release();
    console.log("Database connected and items table ensured.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

export default pool;
