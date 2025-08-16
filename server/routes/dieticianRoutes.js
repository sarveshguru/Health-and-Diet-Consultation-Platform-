const express = require("express");
const router = express.Router();

const {
registerDietician,
loginDietician,
getAllDieticians,
} = require("../controllers/dieticianController");

const {
getDieticianStats,
} = require("../controllers/dieticianStatsController");

const protect = require("../middleware/authMiddleware");
const Dietician = require("../models/Dietician");

// Routes
router.post("/register", registerDietician);
router.post("/login", loginDietician);
router.get("/", getAllDieticians);
router.get("/stats", protect, getDieticianStats);

// NEW: Get logged-in dietician's profile
router.get("/me", protect, async (req, res) => {
try {
const dietician = await Dietician.findById(req.user.id);
if (!dietician) {
return res.status(404).json({ message: "Dietician not found" });
}
res.json(dietician);
} catch (error) {
console.error("Error fetching dietician profile:", error);
res.status(500).json({ message: "Server error" });
}
});

// NEW: Update logged-in dietician's profile
router.put("/me", protect, async (req, res) => {
try {
const { specialization, experienceYears, phone } = req.body;
  
const dietician = await Dietician.findById(req.user.id);
if (!dietician) {
  return res.status(404).json({ message: "Dietician not found" });
}

// Update fields if provided
if (specialization !== undefined) dietician.specialization = specialization;
if (experienceYears !== undefined) dietician.experienceYears = experienceYears;
if (phone !== undefined) dietician.phone = phone;

await dietician.save();

res.json(dietician);
} catch (error) {
console.error("Error updating dietician profile:", error);
res.status(500).json({ message: "Server error" });
}
});

// NEW: Get dietician details by ID
router.get("/details/:dieticianId", async (req, res) => {
  try {
    const dietician = await Dietician.findById(req.params.dieticianId).select("-password");
    if (!dietician) {
      return res.status(404).json({ message: "Dietician not found" });
    }
    res.json(dietician);
  } catch (error) {
    console.error("Error fetching dietician details:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;