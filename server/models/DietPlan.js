const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dieticianId: { type: mongoose.Schema.Types.ObjectId, ref: "Dietician" },
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now },
  description: String,
});

module.exports = mongoose.model("DietPlan", dietPlanSchema);
