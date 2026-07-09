import {
  DISCOUNT_PERCENTAGE,
  MIN_AMOUNT_TO_DISCOUNT,
} from "../config/constants.js";
import { CLIENT_URL } from "../config/envVars.js";
import { stripe } from "../lib/stripe.js";
import { formatProductName } from "../utils/formatProductName.js";

import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import apiError from "../utils/apiError.js";

export const checkoutSession = async (userId, products, couponCode) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new apiError(400, "Invalid or empty products array");
  }

  let totalAmount = 0;

  const lineItems = products.map((product) => {
    if (!product.product.price || typeof product.product.price !== "number") {
      throw new apiError(400, "Invalid product price");
    }

    if (
      !product.quantity ||
      product.quantity < 1 ||
      typeof product.quantity !== "number"
    ) {
      throw new apiError(400, "Invalid product quantity");
    }

    if (!product.product.name || !product.product.image) {
      throw new apiError(400, "Product missing name or image");
    }

    const amount = Math.round(product.product.price * 100); //convert to cents
    totalAmount += amount * product.quantity;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: formatProductName(product.product.name),
          images: [product.product.image],
        },
        unit_amount: amount,
      },
      quantity: product.quantity,
    };
  });

  let coupon = null;

  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode,
      userId,
      isActive: true,
    });

    if (coupon) {
      totalAmount -= Math.round(
        (totalAmount * coupon.discountPercentage) / 100,
      );
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${CLIENT_URL}/checkout-cancel`,
    discounts: coupon?.stripeCouponId
      ? [{ coupon: coupon.stripeCouponId }]
      : [],
    metadata: {
      userId: userId.toString(),
      couponCode: couponCode || "",
      products: JSON.stringify(
        products.map((product) => ({
          id: product.product._id,
          quantity: product.quantity,
          price: product.product.price,
        })),
      ),
    },
  });

  if (totalAmount >= MIN_AMOUNT_TO_DISCOUNT) {
    await Coupon.findOne({
      userId: userId,
      isActive: true,
    });
  }

  return {
    session,
    totalAmountCents: totalAmount, //need to convert in cents,
  };
};

export const successSession = async (session, sessionId) => {
  const existingOrder = await Order.findOne({ stripeSessionId: sessionId });

  if (existingOrder) {
    return existingOrder._id;
  }

  if (session.metadata.couponCode) {
    await Coupon.findOneAndUpdate(
      {
        code: session.metadata.couponCode,
        userId: session.metadata.userId,
      },
      { isActive: false },
    );
  }

  const existingActiveCoupon = await Coupon.findOne({
    userId: session.metadata.userId,
    isActive: true,
  });

  if (
    !existingActiveCoupon &&
    session.amount_subtotal >= MIN_AMOUNT_TO_DISCOUNT
  ) {
    await createNewCoupon(session.metadata.userId);
  }

  const allCoupons = await Coupon.find({});

  let products;

  try {
    products = JSON.parse(session.metadata.products);
  } catch (error) {
    console.error("Failed to parse products metadata:", error);
    throw new apiError(400, "Invalid product data in session");
  }

  const newOrder = new Order({
    user: session.metadata.userId,
    products: products.map((product) => ({
      product: product.id,
      quantity: product.quantity,
      price: product.price,
    })),
    totalAmount: session.amount_total / 100,
    stripeSessionId: sessionId,
  });

  await newOrder.save();

  return newOrder._id;
};

const createNewCoupon = async (userId) => {
  const stripeCoupon = await stripe.coupons.create({
    percent_off: DISCOUNT_PERCENTAGE,
    duration: "once",
  });
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: DISCOUNT_PERCENTAGE,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30days from now
    userId: userId,
    stripeCouponId: stripeCoupon.id,
  });
  await newCoupon.save();

  return newCoupon;
};
