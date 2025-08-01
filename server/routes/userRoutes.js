const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const {
  getUserDetailsById,
} = require("../controllers/userDetailsByIdController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/details/:userId", getUserDetailsById);

module.exports = router;
