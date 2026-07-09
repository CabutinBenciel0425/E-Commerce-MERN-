import { asyncHandler } from "../utils/asyncHandler.js";
import {
  checkoutSession,
  successSession,
} from "../services/payment.service.js";
import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import apiError from "../utils/apiError.js";

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const user = req.user;
  const { products, couponCode } = req.body;

  const { session, totalAmountCents } = await checkoutSession(
    user._id.toString(),
    products,
    couponCode,
  );

  res.status(200).json({
    success: true,
    session,
    totalAmount: (totalAmountCents / 100).toFixed(2),
    currency: session.currency,
  });
});

export const successCheckout = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new apiError(400, "Payment unsuccessful");
  }

  const orderId = await successSession(session, sessionId);

  if (!orderId) {
    throw new apiError(400, "Order unsuccessful to create");
  }

  res.status(200).json({
    success: true,
    message:
      "Payment successful, order created, and coupon deactivated if used",
    orderId: orderId,
  });
});

export const canceledCheckout = asyncHandler(async (req, res) => {});
