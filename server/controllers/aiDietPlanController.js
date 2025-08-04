const { GoogleGenerativeAI } = require("@google/generative-ai");
const AIDietPlan = require("../models/AIDietPlan");

const generateDietPlan = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const userData = req.body;

    const prompt = `Generate a personalized diet plan for:
    Age: ${userData.age}, Gender: ${userData.gender}, Weight: ${
      userData.weight
    }kg, Height: ${userData.height}cm
    Activity Level: ${userData.activityLevel}, Goal: ${userData.goal}
    Dietary Restrictions: ${userData.dietaryRestrictions || "None"}
    Allergies: ${userData.allergies || "None"}
    Food Preferences: ${userData.foodPreferences || "None"}
    
    Return a detailed JSON response with:
    {
      "dailyCalories": number,
      "macronutrients": {
        "protein": number,
        "carbs": number,
        "fats": number
      },
      "mealPlan": {
        "breakfast": ["item1", "item2"],
        "lunch": ["item1", "item2"],
        "dinner": ["item1", "item2"],
        "snacks": ["item1", "item2"]
      },
      "recommendations": ["recommendation1", "recommendation2"],
      "notes": "additional notes"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let dietPlan;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      dietPlan = JSON.parse(jsonMatch[0]);
    } else {
      // Fallback response if JSON parsing fails
      dietPlan = {
        dailyCalories: 2000,
        macronutrients: { protein: 150, carbs: 200, fats: 67 },
        mealPlan: {
          breakfast: ["Oatmeal with berries", "Greek yogurt"],
          lunch: ["Grilled chicken salad", "Quinoa"],
          dinner: ["Salmon with vegetables", "Brown rice"],
          snacks: ["Apple", "Almonds"],
        },
        recommendations: [
          "Drink 8 glasses of water daily",
          "Exercise 30 minutes daily",
        ],
        notes: "Personalized plan based on your inputs",
      };
    }

    // Save the diet plan to database
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    const newDietPlan = new AIDietPlan({
      userId: req.user.id,
      formData: userData,
      dietPlan: dietPlan,
    });

    await newDietPlan.save();

    res.json({ success: true, data: dietPlan });
  } catch (error) {
    console.error("Error generating diet plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate diet plan",
      error: error.message,
    });
  }
};

const getMyDietPlans = async (req, res) => {
  try {
    const dietPlans = await AIDietPlan.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: dietPlans,
    });
  } catch (error) {
    console.error("Error fetching diet plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch diet plans",
      error: error.message,
    });
  }
};

const getDietPlanById = async (req, res) => {
  try {
    const dietPlan = await AIDietPlan.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.json({
      success: true,
      data: dietPlan,
    });
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch diet plan",
      error: error.message,
    });
  }
};

const deleteDietPlan = async (req, res) => {
  try {
    const dietPlan = await AIDietPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.json({
      success: true,
      message: "Diet plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting diet plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete diet plan",
      error: error.message,
    });
  }
};

module.exports = {
  generateDietPlan,
  getMyDietPlans,
  getDietPlanById,
  deleteDietPlan,
};
