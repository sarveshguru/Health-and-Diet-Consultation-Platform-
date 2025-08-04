<<<<<<< HEAD
const BMIHistory = require("../models/BMIHistory");

exports.addBMIRecord = async (req, res) => {
  try {
    const { bmi } = req.body;
    const user = req.user.id;
    // Only add if BMI is a valid number
    if (typeof bmi !== "number" || isNaN(bmi)) {
      return res.status(400).json({ message: "Invalid BMI value" });
    }
    const record = await BMIHistory.create({ user, bmi });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: "Failed to add BMI record" });
  }
};

exports.getBMIHistory = async (req, res) => {
  try {
    const user = req.user.id;
    const records = await BMIHistory.find({ user }).sort({ date: 1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch BMI history" });
  }
};
=======
const BMIHistory = require("../models/BMIHistory");

exports.addBMIRecord = async (req, res) => {
  try {
    const { bmi } = req.body;
    const user = req.user.id;
    // Only add if BMI is a valid number
    if (typeof bmi !== "number" || isNaN(bmi)) {
      return res.status(400).json({ message: "Invalid BMI value" });
    }
    const record = await BMIHistory.create({ user, bmi });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: "Failed to add BMI record" });
  }
};

exports.getBMIHistory = async (req, res) => {
  try {
    const user = req.user.id;
    const records = await BMIHistory.find({ user }).sort({ date: 1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch BMI history" });
  }
};
>>>>>>> origin/main
