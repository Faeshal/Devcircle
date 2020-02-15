const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const bootcamps = require("./routes/bootcamps");

dotenv.config({ path: "./config/config.env" });
app.use(morgan("short"));

// SECTION : Routing
app.use("/api/v1/bootcamps", bootcamps);

// SECTION : SERVER LISTEN
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
