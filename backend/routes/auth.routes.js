import { Router } from "express";
import {
  signin,
  signout,
  signup,
  accessTokenFn,
  userProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authRoute.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const authRoutes = Router();

authRoutes.post("/sign-up", upload.single("image"), signup);

authRoutes.post("/sign-in", signin);

authRoutes.post("/sign-out", signout);

authRoutes.post("/recreate-access-token", protect, accessTokenFn);

authRoutes.get("/profile", protect, userProfile);

export default authRoutes;
