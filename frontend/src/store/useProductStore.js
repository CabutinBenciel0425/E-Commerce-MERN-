import { create } from "zustand";
import { toast } from "react-hot-toast";

import axios from "../lib/axios";

const useProductStore = create((set) => ({
  loading: false,
  products: [],
  pagination: {
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  recommendedProducts: [],
  featuredProducts: [],

  setProducts: (product) => set({ product }),

  clearProducts: () => set({ products: [], loading: false }),

  createNewProduct: async (product) => {
    set({ loading: true });
    const { name, description, price, category, isFeatured, image } = product;

    if (!image || !(image instanceof File)) {
      set({ loading: false });
      toast.error("Please select a valid image file");
      throw new Error("Image is required");
    }

    if (!name || !price || !category || !image) {
      set({ loading: false });
      toast.error("Please fill in all required fields");
      throw new Error("Please fill in all required fields");
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description || "");
    formData.append("price", price);
    formData.append("category", category);
    formData.append("isFeatured", isFeatured ? "true" : "false");
    formData.append("image", image || "");

    try {
      const res = await axios.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((prev) => ({ products: [...prev.products, res.data] }));
      toast.success("Product successfully created");
    } catch (error) {
      console.error(
        `Error in createProduct in productStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getProducts: async (page, limit, filters = {}) => {
    set({ loading: true });

    try {
      const params = {
        page,
        limit,
        ...(filters.category &&
          filters.category !== "allCategory" && { category: filters.category }),
        ...(filters.featured === "featured" && { isFeatured: true }),
        ...(filters.featured === "notFeatured" && { isFeatured: false }),
        sortBy: filters.sortBy || "recent",
      };

      const res = await axios.get("/products", { params });

      set({
        products: res.data.data || [],
        pagination: res.data.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      });
      return res.data.data;
    } catch (error) {
      console.error(
        `Error in getProducts in productStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
      set({ products: [] });
    } finally {
      set({ loading: false });
    }
  },

  toggleIsFeatured: async (productId) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === productId
          ? { ...product, isFeatured: !product.isFeatured }
          : product,
      ),
    }));

    try {
      const res = await axios.patch(`/products/featured/${productId}`);

      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: res.data.data.isFeatured }
            : product,
        ),
      }));

      toast.success("Featured status updated");
      return res.data.data;
    } catch (error) {
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: !product.isFeatured }
            : product,
        ),
      }));

      const message = error.response?.data?.message || "Failed to update";
      toast.error(message);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    if (!productId) {
      set({ loading: false });
      toast.error("Please provide a product id");
      throw new Error("No product id");
    }

    try {
      await axios.delete(`/products/${productId}`);

      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
      toast.success("Product has been deleted");
    } catch (error) {
      console.error(
        `Error in deleteProduct in productStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
      set({ products: [] });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (product) => {
    const { id, name, description, price, category, isFeatured, image } =
      product;
    set({ loading: true });

    if (!name || !price || !category) {
      set({ loading: false });
      toast.error("Please fill in all required fields");
      throw new Error("Please fill in all required fields");
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description || "");
    formData.append("price", price);
    formData.append("category", category);
    formData.append("isFeatured", isFeatured ? "true" : "false");
    formData.append("image", image || "");

    try {
      const res = await axios.patch(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set((prev) => ({ products: [...prev.products, res.data] }));
      toast.success("Product successfully updated");
    } catch (error) {
      console.error(
        `Error in updateProduct in productStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
      set({ products: [] });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getProductsByCategory: async (category) => {
    set({ loading: true });

    if (!category) {
      set({ loading: false });
      toast.error("Category not found");
      throw new Error("Category not found");
    }

    try {
      const res = await axios.get(`/products/category/${category}`);

      set({ products: res.data.data || [] });
    } catch (error) {
      console.error(
        `Error in getProductsByCategory in productStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
      set({ products: [] });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getRecommendedProducts: async () => {
    set({ loading: true });

    try {
      const res = await axios.get("/products/recommendations");

      set({ recommendedProducts: res.data.data });
    } catch (error) {
      console.error(
        `Error in getRecommendedProducts in productStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
      set({ recommendedProducts: [] });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/featured");
      set({ featuredProducts: res.data.data });
    } catch (error) {
      console.error(
        `Error in getRecommendedProducts in productStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
      set({ featuredProducts: [] });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
