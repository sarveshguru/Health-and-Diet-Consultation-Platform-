const mongoose = require("mongoose");

const AIDietPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  formData: {
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    activityLevel: { type: String, required: true },
    goal: { type: String, required: true },
    dietaryRestrictions: { type: String, default: "" },
    allergies: { type: String, default: "" },
    foodPreferences: { type: String, default: "" },
  },
  dietPlan: {
    dailyCalories: { type: Number, required: true },
    macronutrients: {
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fats: { type: Number, required: true },
    },
    mealPlan: {
      breakfast: [{ type: String, required: true }],
      lunch: [{ type: String, required: true }],
      dinner: [{ type: String, required: true }],
      snacks: [{ type: String, required: true }],
    },
    recommendations: [{ type: String, required: true }],
    notes: { type: String, default: "" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AIDietPlan", AIDietPlanSchema);
