const UserDetails = require("../models/UserDetails");

const submitUserDetails = async (req, res) => {
  try {
    const existing = await UserDetails.findOne({ userId: req.user.id });
    if (existing) {
      
      const update = {};
    
      ["height", "weight", "sleepDuration", "waterIntake"].forEach((field) => {
        if (req.body[field] !== undefined) {
          
          update[field] = [
            ...existing[field],
            ...[].concat(req.body[field])
          ].filter((v) => v !== undefined && v !== null && v !== "");
        }
      });
      // For other fields, just set
      [
        "age",
        "gender",
        "medicalConditions",
        "dietaryPreferences",
        "activityLevel",
        "goal",
        "consultationType",
        "hasAllergies",
        "allergyDetails",
        "wakeUpTime",
        "breakfastTime",
        "lunchTime",
        "dinnerTime",
        "snackHabits",
        "substanceUse",
      ].forEach((field) => {
        if (req.body[field] !== undefined) {
          update[field] = req.body[field];
        }
      });
      await UserDetails.updateOne({ userId: req.user.id }, { $set: update });
      return res
        .status(200)
        .json({ message: "User details updated successfully." });
    }
    const newDetails = new UserDetails({
      ...req.body,
      userId: req.user.id,
    });
    await newDetails.save();
    res.status(201).json({ message: "User details saved successfully." });
  } catch (err) {
    console.error("Error saving user details:", err);
    console.error("Request body:", req.body);
    console.error("Decoded user:", req.user);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const details = await UserDetails.findOne({ userId: req.user.id });
    if (!details) {
      return res.status(404).json({ message: "User details not found." });
    }
    res.status(200).json(details);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitUserDetails, getUserDetails };