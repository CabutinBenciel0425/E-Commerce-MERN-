import mongoose, { model, Schema } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stripeCouponId: {
      type: String,
    },
  },
  { timestamps: true },
);

couponSchema.index(
  { userId: 1 },
  { unique: true, partialFilterExpression: { isActive: true } },
);

const Coupon = model("Coupon", couponSchema);

export default Coupon;
