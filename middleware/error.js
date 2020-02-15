const errorHandler = (err, req, res, next) => {
  console.log(`Error: ${err.stack} `.bold.red);

  res.status(500).json({
    success: false,
    error: err.message
  });
};

module.exports = errorHandler;
