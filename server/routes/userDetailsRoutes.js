<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { submitUserDetails, getUserDetails } = require("../controllers/userDetailsController");

// POST /api/user-details
router.post("/", protect, submitUserDetails);

// GET /api/user-details
router.get("/", protect, getUserDetails);

=======
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { submitUserDetails, getUserDetails } = require("../controllers/userDetailsController");

// POST /api/user-details
router.post("/", protect, submitUserDetails);

// GET /api/user-details
router.get("/", protect, getUserDetails);

>>>>>>> origin/main
module.exports = router;