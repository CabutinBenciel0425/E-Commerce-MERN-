import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import useProductStore from "./useProductStore";

const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  _isAuthChecked: false,

  checkAuth: async () => {
    if (get()._isAuthChecked) {
      return;
    }
    set({ checkingAuth: true });

    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data.data, checkingAuth: false, _isAuthChecked: true });
    } catch (error) {
      console.error(
        `Error in checkAuth in userStore: `,
        error.response?.data?.message,
      );
      set({ user: null, checkingAuth: false, _isAuthChecked: true });
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message || "Authentication check failed",
        );
      }
    }
  },

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (!password.trim()) {
      set({ loading: false });
      toast.error("Password cannot be empty");
      throw new Error("Password is empty");
    }

    if (password.trim().length < 6) {
      set({ loading: false });
      toast.error("Password must be atleast 6 characters");
      throw new Error("Password must be atleast 6 characters");
    }

    if (password.trim() !== confirmPassword.trim()) {
      set({ loading: false });
      toast.error("Password do not match");
      throw new Error("Password do not match");
    }

    try {
      await axios.post("/auth/sign-up", { name, email, password });
    } catch (error) {
      console.error(
        `Error in signup in userStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");
    } finally {
      set({ loading: false });
    }
  },

  signin: async ({ email, password }) => {
    set({ loading: true });

    if (!password.trim()) {
      set({ loading: false });
      toast.error("Password cannot be empty");
      throw new Error("Password is empty");
    }

    if (password.trim().length < 6) {
      set({ loading: false });
      toast.error("Password must be atleast 6 characters");
      throw new Error("Password must be atleast 6 characters");
    }

    try {
      const res = await axios.post("/auth/sign-in", { email, password });

      set({ user: res.data.data });
    } catch (error) {
      console.error(
        `Error in signin in userStore: `,
        error.response?.data?.message,
      );

      toast.error(error.response?.data?.message || "Invalid server error");

      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signout: async () => {
    set({ loading: true });

    try {
      await axios.post("/auth/sign-out");
      useProductStore.getState().clearProducts();
      set({ user: null, _isAuthChecked: false });
    } catch (error) {
      console.error(
        `Error in signout in userStore: `,
        error.response?.data?.message,
      );
      toast.error("Sign out failed");
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUserStore;
