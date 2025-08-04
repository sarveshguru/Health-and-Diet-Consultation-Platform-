<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  weight: Number,
  height: Number,
  gender: String,
  healthRecords: [String],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("User", userSchema);
=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  weight: Number,
  height: Number,
  gender: String,
  healthRecords: [String],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("User", userSchema);
>>>>>>> origin/main
