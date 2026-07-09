import {
  Button,
  FileInput,
  Label,
  Radio,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useProductStore from "../store/useProductStore";

const categories = [
  { href: "/jeans", name: "Jeans", imageURL: "/jeans.jpg" },
  { href: "/tshirts", name: "T-Shirts", imageURL: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageURL: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageURL: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageURL: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageURL: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageURL: "/bags.jpg" },
];

function ProductForm() {
  const location = useLocation();
  const product = location?.state?.product;
  const categoryIndex = categories.findIndex(
    (category) =>
      category.name.toLowerCase() === product?.category?.toLowerCase(),
  );

  const defaultCategory = categoryIndex > 0 ? categories[categoryIndex] : "";

  const {
    createNewProduct,
    loading: isCreatingProduct,
    updateProduct,
  } = useProductStore();

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    description: product ? product.description : "",
    price: product ? product.price : "",
    category: defaultCategory.name,
    isFeatured: product ? product.isFeatured : false,
    image: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      isFeatured: false,
      image: null,
    });

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);

    const fileInput = document.getElementById("image");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData;

    if (!product && !formData.image) {
      toast.error("Please select an image");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    if (product) {
      updatedData = {
        ...formData,
        id: product._id,
        price: parseFloat(formData.price),
      };
    } else {
      updatedData = {
        ...formData,
        price: parseFloat(formData.price),
      };
    }

    //in update product, if no image, then the old image will still be the image

    try {
      if (!product) {
        await createNewProduct(updatedData);
      } else {
        await updateProduct(updatedData);
      }

      resetForm();
    } catch (error) {
      console.error("Creation failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center max-h-full mt-10 flex-col gap-10 w-full">
      <div>
        <h1 className="text-2xl font-bold tracking-wider md:text-4xl">
          Create/Update a product
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form
          className="flex w-2xl px-30 flex-col gap-8 border-2 border-gray-200/50 shadow-sm p-10 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 flex items-center justify-center mt-1.5">
              <Label htmlFor="name" className="text-md font-semibold mt-1">
                Name:
              </Label>
            </div>
            <TextInput
              id="name"
              type="text"
              required
              shadow
              className="w-1/2"
              sizing="sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isCreatingProduct}
            />
          </div>

          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label htmlFor="description" className="text-md font-semibold">
                Description:
              </Label>
            </div>
            <Textarea
              id="description"
              type="text"
              placeholder="Type here the products description"
              required
              shadow
              className="w-1/2 resize-none"
              sizing="sm"
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={isCreatingProduct}
            />
          </div>
          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label htmlFor="price" className="text-md font-semibold">
                Price:
              </Label>
            </div>
            <TextInput
              id="price"
              type="number"
              pattern="[0-9]*"
              min={0}
              required
              shadow
              className="w-1/2"
              sizing="sm"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              disabled={isCreatingProduct}
            />
          </div>
          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label htmlFor="category" className="text-md font-semibold">
                Category
              </Label>
            </div>
            <Select
              id="category"
              required
              shadow
              className="w-1/2"
              sizing="sm"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              disabled={isCreatingProduct}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label htmlFor="isFeatured" className="text-md font-semibold">
                Do you want to add this to featured products:
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="yes"
                name="isFeatured"
                value={true}
                onChange={() => setFormData({ ...formData, isFeatured: true })}
                checked={formData.isFeatured === true}
                disabled={isCreatingProduct}
              />
              <Label htmlFor="united-state">Yes</Label>

              <Radio
                id="no"
                name="isFeatured"
                value={false}
                onChange={() => setFormData({ ...formData, isFeatured: false })}
                checked={formData.isFeatured === false}
                disabled={isCreatingProduct}
              />
              <Label htmlFor="united-state">No</Label>
            </div>
          </div>

          <div className="flex flex-row gap-10 w-full justify-between">
            <div className="mb-2 block mt-1.5">
              <Label htmlFor="image" className="text-md font-semibold">
                Upload Image:
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <FileInput
                id="image"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                disabled={isCreatingProduct}
                ref={fileInputRef}
              />

              {imagePreview && (
                <div className="mt-2 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    x
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.image?.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" size="sm" className="cursor-pointer">
            {isCreatingProduct ? (
              <Spinner light size="sm" className="me-3">
                Loading
              </Spinner>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default ProductForm;
