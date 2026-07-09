import { Router } from "express";
import {
  createCheckoutSession,
  successCheckout,
  canceledCheckout,
} from "../controllers/payment.controller.js";
import { protect } from "../middlewares/authRoute.middleware.js";

const paymentRoutes = Router();

paymentRoutes.post("/create-checkout-session", protect, createCheckoutSession);

paymentRoutes.post("/checkout-success", protect, successCheckout);

paymentRoutes.post("/checkout-cancel", protect, canceledCheckout);

export default paymentRoutes;
