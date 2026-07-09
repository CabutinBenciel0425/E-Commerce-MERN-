import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import apiError from "../utils/apiError.js";

export const addToCart = async (userId, productId, quantity = 1) => {
  const user = await User.findById(userId);
  let updatedUser;

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new apiError(404, "Product not found");
  }

  const existingItem = user.cartItems.find(
    (item) => item.product.toString() === productId,
  );

  if (existingItem) {
    updatedUser = await User.findOneAndUpdate(
      { _id: userId, "cartItems.product": productId },
      {
        $inc: { "cartItems.$.quantity": quantity },
      },
      { new: true, runValidators: true },
    ).populate("cartItems.product");
  } else {
    updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          cartItems: {
            product: productId,
            quantity: quantity,
          },
        },
      },
      { new: true, runValidators: true },
    ).populate("cartItems.product");
  }

  return updatedUser.cartItems;
};

export const updateItemQuantity = async (userId, productId, quantity) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(404, "No user found");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new apiError(404, "No product found");
  }

  const item = user.cartItems.find(
    (item) => item.product?.toString() === productId,
  );

  if (!item) {
    throw new apiError(404, "Product not found in cart");
  }

  if (quantity === 0) {
    return await deleteItem(userId, productId);
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, "cartItems.product": productId },
    {
      $set: { "cartItems.$.quantity": quantity },
    },
    { new: true, runValidators: true },
  ).populate("cartItems.product");

  if (!updatedUser) {
    throw new apiError(500, "Failed to update cart");
  }

  return updatedUser.cartItems;
};

export const deleteItem = async (userId, productId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(404, "No user found");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new apiError(404, "Product not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        cartItems: {
          product: productId,
        },
      },
    },
    { new: true, runValidators: true },
  ).populate("cartItems.product");

  if (!updatedUser) {
    throw new apiError(404, "User not found");
  }

  const itemStillExists = updatedUser.cartItems.some(
    (item) => item.product.toString() === productId,
  );

  if (itemStillExists) {
    throw new apiError(400, "Failed to remove item from cart");
  }

  return updatedUser.cartItems;
};

export const clearCart = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        cartItems: [],
      },
    },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new apiError(404, "User not found");
  }

  if (updatedUser.cartItems.length > 0) {
    throw new apiError(400, "Failed to clear cart");
  }

  return updatedUser.cartItems;
};
