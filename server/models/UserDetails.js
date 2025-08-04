<<<<<<< HEAD
const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: Number,
    gender: String,
    height: [Number], 
    weight: [Number], 
    medicalConditions: [String],
    dietaryPreferences: [String],
    activityLevel: String,
    goal: String,
    consultationType: String,
    hasAllergies: String,
    allergyDetails: String,
    wakeUpTime: String,
    breakfastTime: String,
    lunchTime: String,
    dinnerTime: String,
    sleepDuration: [Number], 
    waterIntake: [Number], 
    snackHabits: String,
    substanceUse: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserDetails", userDetailsSchema);
=======
const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    age: Number,
    gender: String,
    height: [Number], // changed to array
    weight: [Number], // changed to array
    medicalConditions: [String],
    dietaryPreferences: [String],
    activityLevel: String,
    goal: String,
    consultationType: String,
    hasAllergies: String,
    allergyDetails: String,
    wakeUpTime: String,
    breakfastTime: String,
    lunchTime: String,
    dinnerTime: String,
    sleepDuration: [Number], // changed to array
    waterIntake: [Number], // changed to array
    snackHabits: String,
    substanceUse: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserDetails", userDetailsSchema);
>>>>>>> origin/main
