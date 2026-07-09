import User from "../models/user.model.js";
import {
  signinUser,
  signoutUser,
  signupUser,
  recreateAccessToken,
} from "../services/auth.service.js";
import apiError from "../utils/apiError.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../utils/setCookies.js";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, image, role } = req.body;
  let imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=random&color=fff&bold=true`;

  if (req.file) {
    const imageDataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    imageUrl = imageDataUri;
  }
  const user = await signupUser({
    name,
    email,
    password,
    role,
    image: imageUrl,
  });

  res.status(201).json({
    success: true,
    message: "Account successfully created",
    data: user,
  });
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { userObj, accessToken, refreshToken } = await signinUser({
    email,
    password,
  });

  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
    success: true,
    message: "Successfully logged in",
    data: userObj,
  });
});

export const signout = asyncHandler(async (req, res) => {
  await signoutUser(req);

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});

export const accessTokenFn = asyncHandler(async (req, res) => {
  const newAccessToken = await recreateAccessToken(req.cookies.refreshToken);

  setAccessTokenCookie(res, newAccessToken);

  res.status(200).json({
    success: true,
    message: "Successfully recreated the access token",
  });
});

export const userProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});
