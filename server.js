const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./config/config.env" });
require("colors");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ! Security
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// Express Request Limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

//  CORS
app.use(cors());

// File Upload
app.use(fileupload());

// Database Connection
connectDB();

// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Optional - Just for render API Documentation
app.set("view engine", "ejs");
app.set("views", "./public");
app.get("/", (req, res, next) => {
  res.render("index");
});

//  : Routing
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

//  : Error Handler
app.use(errorHandler);

//  : SERVER LISTEN
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", err => {
  console.log("Error:" + err.message);
  // Close server & exit process
  server.close(() => process.exit(1));
});
