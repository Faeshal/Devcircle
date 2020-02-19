const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

// * @route   POST /api/v1/auth/register
// @desc    Register a User
// @access  Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // create User
  const user = await User.create({ name, email, password, role });

  sendTokenResponse(user, 200, res);
});

// * @route   POST /api/v1/auth/login
// @desc    Login a User
// @access  Public

exports.login = asyncHandler(async (req, res, next) => {
  // Get email & password , save into body
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new errorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new errorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// get token from model
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token: token
    });
};