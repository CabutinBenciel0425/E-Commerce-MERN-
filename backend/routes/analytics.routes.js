import { Router } from "express";
import { protect, adminOnly } from "../middlewares/authRoute.middleware.js";
import { getAnalytics } from "../controllers/analytics.controller.js";

const analyticsRoutes = Router();

analyticsRoutes.get("/", protect, adminOnly, getAnalytics);

export default analyticsRoutes;
