import Product from "../models/product.model.js";
import apiError from "../utils/apiError.js";
import cloudinary from "../config/cloudinary.js";
import {
  createNewProduct,
  patchProduct,
  updateFeaturedProductsCache,
} from "../services/product.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { storeFeaturedProducts } from "../utils/storeFeaturedProducts.js";
import { recommendations } from "../utils/recommendations.js";

export const createProducts = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (!req.file) {
    throw new apiError(400, "Product image is required");
  }

  const imageDataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

  const newProduct = await createNewProduct({
    ...req.body,
    image: imageDataUri,
    user,
  });

  res.status(201).json({
    success: true,
    message: "Product successfully created",
    data: newProduct,
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const { category, isFeatured, sortBy } = req.query;

  const filter = {};
  if (category && category !== "allCategory") {
    filter.category = category;
  }
  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured === "true";
  }

  const sort = {};
  switch (sortBy) {
    case "recent":
      sort.createdAt = -1;
      break;
    case "oldest":
      sort.createdAt = 1;
      break;
    case "a-z":
      sort.name = 1;
      break;
    case "z-a":
      sort.name = -1;
      break;
    case "high-low":
      sort.price = -1;
      break;
    case "low-high":
      sort.price = 1;
      break;
    default:
      sort.createdAt = -1;
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("createdBy", "name email image")
      .populate("lastModifiedBy", "name email image")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  });
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const featuredProducts = await Product.find({ isFeatured: true }).lean();

  await storeFeaturedProducts(featuredProducts);

  res.status(200).json({
    success: true,
    data: featuredProducts,
  });
});

export const getRecommendedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).lean();

  const recProducts = recommendations(products, 4);

  res.status(200).json({
    success: true,
    data: recProducts,
  });
});

export const getCategoryProducts = asyncHandler(async (req, res) => {
  const categorizedProducts = await Product.find({
    category: req.params.category,
  }).lean();

  res.status(200).json({
    success: true,
    data: categorizedProducts,
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId)
    .populate("createdBy", "name email image")
    .populate("lastModifiedBy", "name email image")
    .lean();

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  if (!product) {
    throw new apiError(404, "Product not found");
  }

  const publicId = product.image.split("/").pop().split(".")[0];
  const deletedPublicId = await cloudinary.uploader.destroy(
    `productImages/${publicId}`,
  );

  if (!deletedPublicId) {
    throw new apiError(404, "Error in deleting image in cloudinary");
  }

  res.status(200).json({
    success: true,
    message: "Product successfully deleted",
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const body = req.body;
  const productId = req.params.productId;

  const updateData = { ...body };

  if (req.file) {
    updateData.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  }

  const updatedProduct = await patchProduct(updateData, productId);

  res.status(201).json({
    success: true,
    message: "Product successfully updated",
    data: updatedProduct,
  });
});

export const toggleIsFeatured = asyncHandler(async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  if (!product) {
    throw new apiError(404, "Product not found");
  }

  product.isFeatured = !product.isFeatured;

  const updatedProduct = await product.save();

  await updateFeaturedProductsCache();

  res.status(201).json({
    success: true,
    message: "Product featured key successfully updated",
    data: updatedProduct,
  });
});
