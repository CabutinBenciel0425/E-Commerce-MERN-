import { Router } from "express";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";
import { protect } from "../middlewares/authRoute.middleware.js";

const couponRoutes = Router();

couponRoutes.get("/", protect, getCoupon);
couponRoutes.post("/validate", protect, validateCoupon);

export default couponRoutes;
