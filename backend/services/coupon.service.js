import Coupon from "../models/coupon.model.js";
import apiError from "../utils/apiError.js";

export const couponValidation = async (userId, couponCode) => {
  if (!couponCode) {
    throw new apiError(400, "Coupon code is required");
  }

  const coupon = await Coupon.findOne({
    code: couponCode,
    userId,
    isActive: true,
  });

  if (!coupon) {
    throw new apiError(404, "Coupon not found");
  }

  return coupon;
};
