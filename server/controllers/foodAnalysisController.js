const foodAnalysisService = require("../services/foodAnalysisService");
const FoodAnalysis = require("../models/FoodAnalysis");

const analyzeFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const userId = req.user.id;

    // Analyze the food image
    const analysisResult = await foodAnalysisService.analyzeFoodImage(
      req.file.buffer,
    );

    // Save to database
    const foodAnalysis = new FoodAnalysis({
      userId,
      imageUrl: req.file.filename || "temp_image.jpg",
      food: analysisResult.food,
      calories: analysisResult.calories,
      proteins: analysisResult.proteins,
      carbs: analysisResult.carbs,
      fats: analysisResult.fats,
      fiber: analysisResult.fiber,
    });

    await foodAnalysis.save();

    res.json({
      success: true,
      data: {
        id: foodAnalysis._id,
        food: analysisResult.food,
        calories: analysisResult.calories,
        proteins: analysisResult.proteins,
        carbs: analysisResult.carbs,
        fats: analysisResult.fats,
        fiber: analysisResult.fiber,
        createdAt: foodAnalysis.createdAt,
      },
    });
  } catch (error) {
    console.error("Food analysis error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to analyze food image",
    });
  }
};

const getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const analyses = await FoodAnalysis.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch analysis history",
    });
  }
};

const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await FoodAnalysis.findOne({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        error: "Analysis not found",
      });
    }

    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch analysis",
    });
  }
};

module.exports = {
  analyzeFood,
  getAnalysisHistory,
  getAnalysisById,
};
