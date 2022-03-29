import { ErrorRequestHandler } from "express";

export const clientResponse: ErrorRequestHandler = (err, req, res, next) => {
  // Defaults to 500 if undefined
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message,
  });

  next();
};
