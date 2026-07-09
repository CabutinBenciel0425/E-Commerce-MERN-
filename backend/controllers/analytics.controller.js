import { getAnalyticsData } from "../services/analytics.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import apiError from "../utils/apiError.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 6 * 24 * 60 * 60 * 1000);
  const analyticsData = await getAnalyticsData(startDate, endDate);

  if (!analyticsData || Object.keys(analyticsData).length === 0) {
    throw new apiError(400, "Cannot get the analytics data");
  }

  res.status(200).json({
    success: true,
    data: analyticsData,
  });
});
