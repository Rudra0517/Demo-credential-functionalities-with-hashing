const mongoose = require("mongoose");

const connectDB = async () => {
  // store the database url in a variable
  const url = process.env.MONGODB_URL;

  try {
    // create connection to the database
    await mongoose.connect(url);
    console.log("DB also connected...");
  } catch (error) {
    console.log("Failed to connect");
  }
};

module.exports = connectDB;
