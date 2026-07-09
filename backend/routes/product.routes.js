import { Router } from "express";
import {
  createProducts,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getFeaturedProducts,
  getRecommendedProducts,
  getCategoryProducts,
  toggleIsFeatured,
} from "../controllers/product.controller.js";
import { adminOnly, protect } from "../middlewares/authRoute.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const productRoutes = Router();

productRoutes.post(
  "/create",
  protect,
  adminOnly,
  upload.single("image"),
  createProducts,
);

productRoutes.get("/", protect, adminOnly, getProducts);

//can get by all users, also even not logged in
productRoutes.get("/featured", getFeaturedProducts);

productRoutes.get("/recommendations", getRecommendedProducts);

productRoutes.get("/category/:category", getCategoryProducts);

productRoutes.get("/:productId", protect, adminOnly, getProduct);

productRoutes.delete("/:productId", protect, adminOnly, deleteProduct);

productRoutes.patch(
  "/:productId",
  protect,
  adminOnly,
  upload.single("image"),
  updateProduct,
);

productRoutes.patch(
  "/featured/:productId",
  protect,
  adminOnly,
  toggleIsFeatured,
);

export default productRoutes;
