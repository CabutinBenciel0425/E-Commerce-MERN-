import { useEffect } from "react";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import useAnalyticsStore from "../store/useAnalyticsStore";
import MiniSpinner from "../components/MiniSpinner";
import AnalyticsCard from "../components/AnalyticsCard";

function AnalyticsPage() {
  const { loading, dailySalesData, analyticsData, getAnalyticsData } =
    useAnalyticsStore();

  useEffect(() => {
    getAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="mt-20">
        <MiniSpinner />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No analytics data available</p>
      </div>
    );
  }

  const { totalUsers, totalProducts, totalSales, totalRevenue } = analyticsData;

  console.log(totalUsers, totalProducts, totalSales, totalRevenue);
  console.log(dailySalesData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="w-32 h-32 text-primary-400 opacity-10" />}
        />

        <AnalyticsCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="w-32 h-32 text-primary-400 opacity-10" />}
        />

        <AnalyticsCard
          title="Total Sales"
          value={totalSales}
          icon={
            <ShoppingCart className="w-32 h-32 text-primary-400 opacity-10" />
          }
        />

        <AnalyticsCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={
            <DollarSign className="w-32 h-32 text-primary-400 opacity-10" />
          }
        />
      </div>

      <div className="opacity-60 rounded-lg p-6 shadow-lg overflow-hidden relative border border-gray-200">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="4 4" stroke="#000" />
            <XAxis dataKey="date" stroke="#062B65" tick={{ fill: "#6b7280" }} />
            <YAxis
              yAxisId="left"
              stroke="#6b7280"
              tick={{ fill: "#6b7280" }}
              domain={[0, "auto"]}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              tick={{ fill: "#6b7280" }}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "10px",
              }}
              formatter={(value, name) => [
                name === "revenue" ? `$${value.toFixed(2)}` : value,
                name === "revenue" ? "Revenue" : "Sales",
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#079CFF"
              strokeWidth={3}
              dot={{ fill: "#079CFF", r: 5 }}
              activeDot={{ r: 8 }}
              name="Revenue"
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="sales"
              stroke="#57d6bc"
              strokeWidth={3}
              dot={{ fill: "#57d6bc", r: 5 }}
              activeDot={{ r: 8 }}
              name="Sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnalyticsPage;
