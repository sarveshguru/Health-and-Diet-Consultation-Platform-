const mongoose = require("mongoose");

const foodAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    food: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    proteins: {
      type: Number,
      required: true,
      min: 0,
    },
    carbs: {
      type: Number,
      required: true,
      min: 0,
    },
    fats: {
      type: Number,
      required: true,
      min: 0,
    },
    fiber: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
foodAnalysisSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("FoodAnalysis", foodAnalysisSchema);
