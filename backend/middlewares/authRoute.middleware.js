import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";

import { ACCESS_TOKEN_SECRET_KEY } from "../config/envVars.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new apiError(401, "Not authenticated. Please log in");
  }

  const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  req.user = user;

  next();
});

export const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new apiError(
      403,
      "You are not authorized on this endpoint. Admin only",
    );
  }

  next();
});
