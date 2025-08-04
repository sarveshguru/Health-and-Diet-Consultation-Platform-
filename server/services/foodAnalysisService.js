<<<<<<< HEAD
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
require("dotenv").config();

class FoodAnalysisService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  }

  async analyzeFoodImage(imageBuffer) {
    try {
      // Convert image to base64
      const base64Image = imageBuffer.toString("base64");

      const prompt = `Analyze this food image and provide:
      1. A short description of the dish
      2. Main ingredients visible
      3. Estimated nutritional values per serving:
         - Calories (Cal)
         - Proteins (g)
         - Carbohydrates (g)
         - Fats (g)
         - Fiber (g)
      
      Return the response in this exact JSON format:
      {
        "food": "Dish description",
        "calories": 0,
        "proteins": 0,
        "carbs": 0,
        "fats": 0,
        "fiber": 0
      }`;

      const imageParts = [
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
      ];

      const result = await this.model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text;

      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback response if JSON parsing fails
      return {
        food: "Mixed food dish",
        calories: 300,
        proteins: 15,
        carbs: 40,
        fats: 12,
        fiber: 5,
      };
    } catch (error) {
      console.error("Error analyzing food:", error);
      throw new Error("Failed to analyze food image");
    }
  }
}

module.exports = new FoodAnalysisService();
=======
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");
require("dotenv").config();

class FoodAnalysisService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  }

  async analyzeFoodImage(imageBuffer) {
    try {
      // Convert image to base64
      const base64Image = imageBuffer.toString("base64");

      const prompt = `Analyze this food image and provide:
      1. A short description of the dish
      2. Main ingredients visible
      3. Estimated nutritional values per serving:
         - Calories (Cal)
         - Proteins (g)
         - Carbohydrates (g)
         - Fats (g)
         - Fiber (g)
      
      Return the response in this exact JSON format:
      {
        "food": "Dish description",
        "calories": 0,
        "proteins": 0,
        "carbs": 0,
        "fats": 0,
        "fiber": 0
      }`;

      const imageParts = [
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
      ];

      const result = await this.model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text;

      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback response if JSON parsing fails
      return {
        food: "Mixed food dish",
        calories: 300,
        proteins: 15,
        carbs: 40,
        fats: 12,
        fiber: 5,
      };
    } catch (error) {
      console.error("Error analyzing food:", error);
      throw new Error("Failed to analyze food image");
    }
  }
}

module.exports = new FoodAnalysisService();
>>>>>>> origin/main
