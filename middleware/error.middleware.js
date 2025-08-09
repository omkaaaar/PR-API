const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    // Log to console for debugging
    console.error("Error:", error);
    // Mongoose bad ObjectId error
    if (err.name === "CastError") {
      res
        .status(400)
        .send({ message: `Resource not found. Invalid: ${err.path}` });
    }
    // Mongoose duplicate key error
    if (err.code === 11000) {
      res.status(400).send({
        message: `Duplicate field value entered: ${err.keyValue.name}. Please use another value.`,
      });
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      res.status(400).send({ message: message });
    }
  } catch (error) {
    console.error("Error in errorMiddleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
  next();
};

export default errorMiddleware;
