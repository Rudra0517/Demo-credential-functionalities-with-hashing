const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  age: String,
  email: String,
  password: String,
  gender: String,
  image_url: String,
  city: String,
  OTP: String,
  role: String,
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
