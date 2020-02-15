// @desc    Get All bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: "show all bootcamp" });
};

// @desc    Get Single Bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "show single bootcamp : " + req.params.id
  });
};

// @desc    Create bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, message: "created bootcamp" });
};

// @desc    Edit bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "updated bootcamp : " + req.params.id });
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Deleted bootcamp ${req.params.id}` });
};
