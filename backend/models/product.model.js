import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: 2,
      maxlength: 80,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "Product price is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    category: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ price: 1 });
productSchema.index({ category: 1, isFeatured: 1 });
productSchema.index({ category: 1, isFeatured: 1, price: 1 });

const Product = model("Product", productSchema);

export default Product;
