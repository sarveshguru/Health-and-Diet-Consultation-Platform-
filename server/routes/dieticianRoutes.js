const express = require("express");
const router = express.Router();

const {
  registerDietician,
  loginDietician,
  getAllDieticians,
  getDieticianProfile,
} = require("../controllers/dieticianController");
const {
  getDieticianStats,
} = require("../controllers/dieticianStatsController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerDietician);
router.post("/login", loginDietician);
router.get("/", getAllDieticians);
router.get("/profile", protect, getDieticianProfile);
router.get("/stats", protect, getDieticianStats);

module.exports = router;
