// src/utils/database.js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased timeout for cloud databases
  // SSL is required for cloud databases like Neon
  ssl: process.env.DB_SSL === 'true' || process.env.DB_HOST?.includes('neon.tech') || process.env.DB_HOST?.includes('supabase.co') 
    ? { rejectUnauthorized: false } 
    : false,
});

async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL connected successfully");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error);
    throw error;
  }
}

module.exports = { pool, connectDB };
