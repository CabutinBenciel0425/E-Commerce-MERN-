import cloudinary from "../config/cloudinary.js";

export const imageUpload = async (image) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "productImages",
    });

    return uploadedImage;
  } catch (error) {
    console.error(`Error in imageUpload fn: ${error.message}`);
    throw new Error("Image cannot upload. Please try again");
  }
};
