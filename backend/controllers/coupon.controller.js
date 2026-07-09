import Coupon from "../models/coupon.model.js";
import { couponValidation } from "../services/coupon.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCoupon = asyncHandler(async (req, res) => {
  const user = req.user;

  const coupon = await Coupon.findOne({ userId: user._id, isActive: true });

  res.status(200).json({
    success: true,
    data: coupon ? coupon : null,
  });
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const user = req.user;
  const { couponCode } = req.body;

  const coupon = await couponValidation(user._id, couponCode);

  if (coupon.expirationDate.getTime() < Date.now()) {
    coupon.isActive = false;
    await coupon.save();
    return res.status(200).json({
      success: false,
      message: "Coupon expired",
    });
  }

  res.status(200).json({
    success: true,
    code: coupon.code,
    discount: coupon.discountPercentage,
  });
});
