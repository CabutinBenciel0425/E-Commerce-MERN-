import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

const useAnalyticsStore = create((set) => ({
  loading: false,
  dailySalesData: [],
  analyticsData: null,

  getAnalyticsData: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/analytics");
      const {
        totalUsers,
        totalProducts,
        totalSales,
        totalRevenue,
        dailySalesData,
      } = res.data.data;

      set({
        dailySalesData: dailySalesData || [],
        analyticsData: {
          totalUsers: totalUsers || 0,
          totalProducts: totalProducts || 0,
          totalSales: totalSales || 0,
          totalRevenue: totalRevenue || 0,
        },
      });
    } catch (error) {
      console.error(
        `Error in getAnalyticsData in analyticsStore`,
        error?.response.data?.message,
      );
      set({
        loading: false,
        dailySalesData: [],
        analyticsData: null,
      });
      toast.error("Error in fetching analytics data");
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAnalyticsStore;
