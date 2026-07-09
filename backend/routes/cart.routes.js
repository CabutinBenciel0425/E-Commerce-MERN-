import { Router } from "express";
import { adminOnly, protect } from "../middlewares/authRoute.middleware.js";
import {
  addToCartItems,
  deleteCartItem,
  getCartItems,
  toggleQuantity,
  clearCartItem,
} from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.get("/", protect, getCartItems);
cartRoutes.post("/:productId", protect, addToCartItems);
cartRoutes.patch("/:productId", protect, toggleQuantity);
cartRoutes.delete("/:productId", protect, deleteCartItem);
cartRoutes.delete("/", protect, clearCartItem);

export default cartRoutes;
