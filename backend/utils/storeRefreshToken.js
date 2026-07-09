import { redis } from "../lib/redis.js";

export const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    15 * 24 * 60 * 60, //15days
  );
};
