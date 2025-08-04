<<<<<<< HEAD
const mongoose = require("mongoose");

const dieticianSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  experienceYears: Number,
  qualifications: String,
  bio: String,
  availableSlots: [
    {
      date: Date,
      timeSlots: [String],
      isBooked: Boolean,
    },
  ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  dietPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "DietPlan" }],
});

module.exports = mongoose.model("Dietician", dieticianSchema);
=======
const mongoose = require("mongoose");

const dieticianSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  experienceYears: Number,
  qualifications: String,
  bio: String,
  availableSlots: [
    {
      date: Date,
      timeSlots: [String],
      isBooked: Boolean,
    },
  ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  dietPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "DietPlan" }],
});

module.exports = mongoose.model("Dietician", dieticianSchema);
>>>>>>> origin/main
