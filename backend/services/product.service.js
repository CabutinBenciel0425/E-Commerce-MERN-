import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import { imageUpload } from "../utils/imageUpload.js";

export const createNewProduct = async (payload) => {
  const { name, description, price, image, category, isFeatured, user } =
    payload;

  const isProductExists = await Product.findOne({ name }).lean();

  if (isProductExists) {
    throw new apiError(409, "Product name already exists");
  }
  const uploadedImage = await imageUpload(image);

  const newProduct = await Product.create({
    name,
    description,
    price,
    image: uploadedImage?.secure_url ? uploadedImage.secure_url : "",
    category: category.toLowerCase(),
    isFeatured,
    createdBy: user.id,
    lastModifiedBy: user.id,
  });

  await User.findByIdAndUpdate(user.id, {
    $push: {
      products: newProduct._id,
    },
  });

  return newProduct;
};

export const patchProduct = async (body, productId) => {
  const { name, description, price, image, category, isFeatured } = body;
  let oldImage = "";

  const product = await Product.findById(productId).lean();

  if (!product) {
    throw new apiError(404, "Product not found");
  }

  if (!image) {
    oldImage = product.image;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      description,
      price,
      image: image ? image : oldImage,
      category,
      isFeatured,
    },
    { new: true, runValidators: true },
  );

  if (!updatedProduct) {
    throw new apiError(400, "Product unable to update");
  }

  return updatedProduct;
};

export const getRandomProductsByCategory = async (category, count = 3) => {
  if (!category) {
    throw new apiError(
      400,
      "getRandomProductsByCategory fn error: Category params is required",
    );
  }
  const products = await Product.aggregate([
    { $match: { category } },
    { $sample: { size: count } },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        image: 1,
      },
    },
  ]);

  return products;
};

export const updateFeaturedProductsCache = async () => {
  const featuredProducts = await Product.find({ isFeatured: true }).lean();

  if (!featuredProducts) {
    throw new apiError(400, "Error in fetching featured products");
  }

  await redis.set("featuredProducts", JSON.stringify(featuredProducts));
};
