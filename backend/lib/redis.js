import { Redis } from "ioredis";
import { REDIS_URL } from "../config/envVars.js";

export const redis = new Redis(REDIS_URL);

redis.on("error", (err) => {
  console.error(`Redis error: ${err.message}`);
});
