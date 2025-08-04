<<<<<<< HEAD
// const express = require("express");
// const router = express.Router();

// const {
//   registerDietician,
//   loginDietician,
//   getAllDieticians,
// } = require("../controllers/dieticianController");
// const {
//   getDieticianStats,
// } = require("../controllers/dieticianStatsController");
// const protect = require("../middleware/authMiddleware");

// router.post("/register", registerDietician);
// router.post("/login", loginDietician);
// router.get("/", getAllDieticians);
// router.get("/stats", protect, getDieticianStats);

// module.exports = router;
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


module.exports = router;
=======
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
>>>>>>> origin/main
