import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  loadingItems: {},
  loading: false,
  coupon: null,
  isCouponApplied: false,
  total: 0,
  subTotal: 0,

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subTotal = cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const discountPercentage = coupon ? coupon.discountPercentage / 100 : 0;
    const discountPrice = subTotal * discountPercentage;
    const total = subTotal - discountPrice;

    set({ subTotal: subTotal, total: total });
  },

  //cart
  addToCart: async (id, quantity) => {
    set((state) => ({ loadingItems: { ...state.loadingItems, [id]: true } }));

    const productId = id.toString();
    if (!productId) {
      set({ loadingItems: { ...get().loadingItems, [id]: false } });
      toast.error("Product id not found");
      throw new Error("Product id not found");
    }

    if (!quantity || typeof quantity !== "number") {
      set({ loadingItems: { ...get().loadingItems, [id]: false } });
      toast.error("Quantity must be a number");
      throw new Error("Quantity must be a number");
    }

    try {
      const res = await axios.post(`/cart/${productId}`, {
        quantity: quantity,
      });
      const cartData = res.data.data?.cartItems || res.data.data || [];

      set({
        cart: cartData,
      });
      toast.success("Product added to cart");

      get().calculateTotals();
    } catch (error) {
      console.error(
        `Error in addToCart in cartStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");

      throw error;
    } finally {
      set({ loadingItems: { ...get().loadingItems, [id]: false } });
    }
  },

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/cart");

      set({ cart: res.data.data.cartItems || [] });
      get().calculateTotals();
    } catch (error) {
      console.error(
        `Error in getCartItems in cartStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
      set({ cart: [] });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteCartItem: async (id) => {
    set({ loadingItems: { ...get().loadingItems, [id]: false } });

    if (!id) {
      set({ loadingItems: { ...get().loadingItems, [id]: false } });
      toast.error("Product id not found");
      throw new Error("Product id not found");
    }

    try {
      await axios.delete(`/cart/${id}`);

      set((prev) => ({
        cart: prev.cart.filter((item) => item.product._id !== id),
      }));
      toast.success("Item successfully deleted");
      get().calculateTotals();
    } catch (error) {
      console.error(
        `Error in deleteCartItem in cartStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");

      throw error;
    } finally {
      set({ loadingItems: { ...get().loadingItems, [id]: false } });
    }
  },

  clearCart: async () => {
    set({ loading: true });

    try {
      await axios.delete(`/cart`);

      set({ cart: [] });
      toast.success("Cart has been cleared");
    } catch (error) {
      console.error(
        `Error in clearCart in cartStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  itemQuantityToggle: async (id, quantity) => {
    set({ loading: true });

    if (!id) {
      set({ loading: false });
      toast.error("Product id not found");
      throw new Error("Product id not found");
    }

    if (typeof quantity !== "number") {
      set({ loading: false });
      toast.error("Quantity must be a number");
      throw new Error("Quantity must be a number");
    }

    try {
      const res = await axios.patch(`/cart/${id}`, { quantity: quantity });

      set({ cart: res.data.data });

      get().calculateTotals();
      toast.success("Quantity updated");
    } catch (error) {
      console.error(
        `Error in itemQuantityToggle in cartStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  //coupons
  getMyCoupon: async () => {
    try {
      const res = await axios.get("/coupon");
      set({ coupon: res.data.data });
    } catch (error) {
      console.error("Error in getMyCoupon in cartStore:", error);
      toast.error(error.response?.data?.message || "Internal server error");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  applyCoupon: async (couponCode) => {
    try {
      const res = await axios.post("/coupon/validate", { couponCode });
      const { code, discount } = res.data;

      set({
        coupon: { code, discountPercentage: discount },
        isCouponApplied: true,
      });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      console.error("Error in applyCoupon in cartStore:", error);
      toast.error(error.response?.data?.message || "Internal server error");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  removeCoupon: async () => {
    set({ isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },
}));

export const useCartLength = () => useCartStore((state) => state.cart.length);

export default useCartStore;
