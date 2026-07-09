import { redis } from "../lib/redis.js";

export const storeFeaturedProducts = async (payload) => {
  let featuredProducts = await redis.get("featuredProducts");

  if (featuredProducts) return JSON.parse(featuredProducts);

  await redis.set("featuredProducts", JSON.stringify(payload));
};
