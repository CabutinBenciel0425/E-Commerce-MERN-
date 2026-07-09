import dotenv from "dotenv";

dotenv.config();

export const {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  REDIS_URL,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_SECRET_KEY,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
  CLOUDINARY_CLOUD_NAME,
  STRIPE_SECRET_KEY,
  CLIENT_URL,
  RANDOM_PROFILE_URL,
} = process.env;
