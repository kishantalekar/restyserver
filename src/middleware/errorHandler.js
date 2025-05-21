const errorHandler = (err, req, res, next) => {
  // Default error status and message
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Log error for debugging
  console.error(`[Error] ${status} - ${message}`);
  console.error(err.stack);

  // Custom error response
  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
