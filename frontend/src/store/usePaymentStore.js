import { toast } from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";
import useCartStore from "./useCartStore";

export const usePaymentStore = create((set) => ({
  loading: false,

  createCheckoutSession: async ({ products, couponCode }) => {
    set({ loading: true });

    try {
      const { data } = await axios.post("/payment/create-checkout-session", {
        products,
        couponCode,
      });

      if (data?.session?.url) {
        window.location.href = data.session.url;
        return;
      }

      toast.error("Unable to start checkout");
      throw new Error("No checkout URL returned");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Checkout failed");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  checkoutSuccess: async (sessionId) => {
    set({ loading: true });

    try {
      const { data } = await axios.post("/payment/checkout-success", {
        sessionId,
      });
      useCartStore.getState().clearCart();
      toast.success("Payment successful!");
      return data;
    } catch (error) {
      console.error("Error in checkoutSuccess in paymentStore:", error);
      toast.error(error.response?.data?.message || "Internal server error");
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
