const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addBMIRecord,
  getBMIHistory,
} = require("../controllers/bmiHistoryController");

router.post("/", protect, addBMIRecord);
router.get("/", protect, getBMIHistory);

module.exports = router;
