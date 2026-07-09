import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_SECRET_KEY,
  RANDOM_PROFILE_URL,
} from "../config/envVars.js";
import { redis } from "../lib/redis.js";
import { generateToken } from "../utils/generateToken.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { storeRefreshToken } from "../utils/storeRefreshToken.js";
import apiError from "../utils/apiError.js";
import { imageUpload } from "../utils/imageUpload.js";

export const signupUser = async (data) => {
  const { name, email, password, role } = data;
  let imageUrl = data.image;

  const isUserExists = await User.findOne({ email }).lean();

  if (isUserExists) {
    throw new apiError(409, "User already exists");
  }

  let cloudinaryImageUrl = "";

  if (imageUrl && imageUrl.startsWith("data")) {
    try {
      const uploadedImage = await imageUpload(imageUrl);
      cloudinaryImageUrl = uploadedImage?.secure_url || "";
    } catch (error) {
      console.error("Image upload failed", error.message);
    }
  } else if (imageUrl) {
    cloudinaryImageUrl = imageUrl;
  }

  const newUser = new User({
    name,
    email,
    password,
    image:
      cloudinaryImageUrl ||
      `${RANDOM_PROFILE_URL}name=${encodeURIComponent(name)}&size=128&background=random&color=fff&bold=true`,
    role,
  });
  await newUser.save();

  const payload = { id: newUser._id, email: newUser.email };

  const { refreshToken } = generateToken(payload);

  await storeRefreshToken(newUser._id, refreshToken);

  const userObj = sanitizeUser(newUser);

  return userObj;
};

export const signinUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new apiError(401, "Invalid credentials. Please try again");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new apiError(401, "Invalid credentials. Please try again");
  }

  const payload = { id: user._id, email: user.email };

  const { accessToken, refreshToken } = generateToken(payload);

  await storeRefreshToken(user._id, refreshToken);

  const userObj = sanitizeUser(user);

  return { userObj, accessToken, refreshToken };
};

export const signoutUser = async (req) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    await redis.del(`refresh_token:${decoded.id}`);
  }

  return true;
};

export const recreateAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new apiError(401, "No refresh token provided");
  }

  const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);

  const storedToken = await redis.get(`refresh_token:${decoded.id}`);

  if (!storedToken || storedToken !== refreshToken) {
    throw new apiError(401, "Invalid refresh token");
  }

  const newAccessToken = jwt.sign(
    { id: decoded.id, email: decoded.email },
    ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "15m" },
  );

  return newAccessToken;
};
