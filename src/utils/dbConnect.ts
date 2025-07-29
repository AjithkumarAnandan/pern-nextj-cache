import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.HOST_ENV ?? "";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // only if you face SSL errors (Neon uses SSL)
  },
  // host: process.env.PG_HOST ?? "localhost",
  // port: parseInt(process.env.PG_PORT ?? "5432", 10),
  // user: process.env.PG_USER ?? "postgres",
  // password: process.env.PG_PASSWORD,
  // database: process.env.PG_DATABASE ?? "fullstacknextjs",
});

const postgresConnect = async () => {
  try {
    // Connect to PostgreSQL
    await pool.connect();
    if (!pool) {
      throw new Error(
        "❌ POSTGRES_URI is not defined in environment variables."
      );
    }
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", (error as Error).message);
    throw new Error("PostgreSQL connection failed");
  }
};

// CORS middleware configuration
const corsOptions = {
  origin: port, // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE,HEAD,PATCH", // Allowable methods
};

app.use(cors(corsOptions));

// export { dbConnect, postgresConnect };
export { postgresConnect };
