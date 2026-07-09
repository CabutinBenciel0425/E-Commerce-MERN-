import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

import { connectDB } from "./lib/db.js";
import { CLIENT_URL, PORT } from "./config/envVars.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

const possiblePaths = [
  path.join(__dirname, "../frontend/dist"),
  path.join(__dirname, "../../frontend/dist"),
  path.join(process.cwd(), "frontend/dist"),
  path.join(process.cwd(), "../frontend/dist"),
];

let frontendPath = null;
for (const testPath of possiblePaths) {
  try {
    if (fs.existsSync(testPath)) {
      frontendPath = testPath;
      console.log(`✅ Frontend found at: ${frontendPath}`);
      break;
    }
  } catch (err) {}
}

if (!frontendPath) {
  console.warn("⚠️ Frontend dist not found, using default path");
  frontendPath = path.join(__dirname, "../frontend/dist");
}

app.use(express.static(frontendPath));

app.use((req, res, next) => {
  if (req.path.startsWith("/api") || req.path === "/health") {
    return next();
  }
  const indexPath = path.join(frontendPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({
      success: false,
      message: "Frontend build not found",
    });
  }
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
  connectDB();
});
