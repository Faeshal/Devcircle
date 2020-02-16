const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const Bootcamp = require("./models/Bootcamp");

// Connect Mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Import File To MongoDB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Sucessfully Import Data...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Destroy data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Succesfully Destroy Data ...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// For ClI
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
