import User from "../models/user.model.js";
import {
  addToCart,
  clearCart,
  deleteItem,
  updateItemQuantity,
} from "../services/cart.service.js";
import apiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCartItems = asyncHandler(async (req, res) => {
  const user = req.user;

  const cartItemsPopulated = await User.findById(user._id).populate(
    "cartItems.product",
  );

  res.status(200).json({
    success: true,
    data: cartItemsPopulated,
  });
});

export const addToCartItems = asyncHandler(async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity) || 1;

  const cartItems = await addToCart(user._id, productId, quantity);
  const cartLength = cartItems.length;

  res.status(200).json({
    success: true,
    data: cartItems,
    cartLength,
  });
});

export const toggleQuantity = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const user = req.user;

  if (typeof quantity !== "number") {
    throw new apiError(400, "Quantity must be a Number type");
  }

  if (quantity < 0) {
    throw new apiError(400, "Quantity must always higher than zero");
  }

  const cartItems = await updateItemQuantity(user._id, productId, quantity);

  if (cartItems.length !== 0) {
    res.status(200).json({
      success: true,
      data: cartItems,
    });
  } else {
    res.status(200).json({
      success: true,
      data: [],
      message: "Cart is now empty",
    });
  }
});

export const deleteCartItem = asyncHandler(async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;

  const cartItems = await deleteItem(user._id, productId);

  const message =
    cartItems.length > 0 ? "Item successfully deleted" : "Cart is now empty";

  res.status(200).json({
    success: true,
    message,
  });
});

export const clearCartItem = asyncHandler(async (req, res) => {
  const user = req.user;

  await clearCart(user._id);

  res.status(200).json({
    success: true,
    message: "Cart successfully been cleared",
  });
});
