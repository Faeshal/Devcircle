const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res) => {
  let error = { ...err };
  console.log(`Error: ${err.stack} `.bold.red);
  error.message = err.message;

  // mongoose bad object_id
  if (err.name === "errorStack") {
    const message = `Resource no found with id ${err.value}, 404`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error"
  });
};

module.exports = errorHandler;
