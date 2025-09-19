const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, unique: true },
  phone: { type: String },
  age: { type: Number },
  gender: { type: String },
  education: { type: String },
  college: { type: String },
  skills: { type: [String] },
  preferences: { type: [String] },
  
});

module.exports = mongoose.model("User", userSchema);