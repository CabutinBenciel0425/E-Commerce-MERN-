import { NODE_ENV } from "../config/envVars.js";
import apiError from "../utils/apiError.js";

export const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof apiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";

    if (error.name === "CastError") {
      statusCode = 400;
      message: `Invalid value for field: ${error.path}`;
    }

    if (error.name === "ValidationError") {
      statusCode = 400;
      message: Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
    }

    if (error.name === 11000) {
      statusCode === 409;
      const field = Object.keys(error.keyValue)[0];
      message = `${field} already exists`;
    }

    if (error.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Invalid token";
    }

    if (error.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Token has expired";
    }

    error = new apiError(statusCode, message);
  }

  console.error(`[Error] ${req.method} ${req.originalUrl} -> ${err.message}`);
  if (NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    ...(NODE_ENV === "development" && { stack: err.stack }),
  });
};
