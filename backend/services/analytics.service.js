import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import { getDateInRange } from "../utils/getDatesInRange.js";

export const getAnalyticsData = async (startDate, endDate) => {
  const { totalUsers } = await getTotalUsers();
  const { totalProducts } = await getTotalProducts();
  const { totalSales, totalRevenue } = await getSalesData();
  const dailySalesData = await getDailySalesData(startDate, endDate);

  return {
    totalUsers,
    totalProducts,
    totalSales,
    totalRevenue,
    dailySalesData,
  };
};

const getTotalUsers = async () => {
  const totalUsers = await User.countDocuments({});
  return { totalUsers };
};

const getTotalProducts = async () => {
  const totalProducts = await Product.countDocuments({});
  return { totalProducts };
};

const getSalesData = async () => {
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return { totalSales, totalRevenue };
};

const getDailySalesData = async (startDate, endDate) => {
  const dailySalesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        sales: { $sum: 1 },
        revenue: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const dates = getDateInRange(startDate, endDate);

  const datesWithData = dates.map((date) => {
    const foundData = dailySalesData.find((item) => item._id === date);

    return {
      date,
      sales: foundData?.sales || 0,
      revenue: foundData?.revenue || 0,
    };
  });

  return datesWithData;
};
