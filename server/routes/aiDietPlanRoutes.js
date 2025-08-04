const express = require("express");
const router = express.Router();
const aiDietPlanController = require("../controllers/aiDietPlanController");
const protect = require("../middleware/authMiddleware");

router.post("/generate", protect, aiDietPlanController.generateDietPlan);
router.get("/my-plans", protect, aiDietPlanController.getMyDietPlans);
router.get("/:id", protect, aiDietPlanController.getDietPlanById);
router.delete("/:id", protect, aiDietPlanController.deleteDietPlan);

module.exports = router;
