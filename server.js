const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const PORT = process.env.PORT || 5000;
const bootcamps = require("./routes/bootcamps");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// SECTION : Database Connection
connectDB();

// SECTION : Body Parser
app.use(express.json());

// SECTION : Routing
app.use("/api/v1/bootcamps", bootcamps);

// SECTION : SERVER LISTEN
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log("Error:" + err.message);
  // Close server & exit process
  server.close(() => process.exit(1));
});
