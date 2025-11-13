// src/utils/redis.js
const redis = require("redis");

let client = null;
let isRedisAvailable = false;

// Only create Redis client if Redis is configured
if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
  client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || undefined,
  });

  client.on("error", (err) => {
    console.error("Redis Client Error:", err);
    isRedisAvailable = false;
  });
}

// Helper function to safely execute Redis operations
async function safeRedisOperation(operation) {
  if (!isRedisAvailable || !client) {
    return null;
  }
  try {
    return await operation();
  } catch (error) {
    console.error("Redis operation failed:", error);
    isRedisAvailable = false;
    return null;
  }
}

async function connectRedis() {
  // If Redis is not configured, skip connection
  if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    console.log("⚠️  Redis not configured - running without cache");
    return;
  }

  if (!client) {
    console.log("⚠️  Redis client not initialized - running without cache");
    return;
  }

  try {
    await client.connect();
    isRedisAvailable = true;
    console.log("✅ Redis connected successfully");
  } catch (error) {
    console.warn("⚠️  Redis connection failed - running without cache:", error.message);
    isRedisAvailable = false;
    // Don't throw error - allow app to continue without Redis
  }
}

// Wrapper functions for Redis operations
async function get(key) {
  return await safeRedisOperation(async () => {
    return await client.get(key);
  });
}

async function setEx(key, seconds, value) {
  return await safeRedisOperation(async () => {
    return await client.setEx(key, seconds, value);
  });
}

async function del(key) {
  return await safeRedisOperation(async () => {
    return await client.del(key);
  });
}

module.exports = { 
  client, 
  connectRedis, 
  get, 
  setEx, 
  del,
  isRedisAvailable: () => isRedisAvailable 
};
