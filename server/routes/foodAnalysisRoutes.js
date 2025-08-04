<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  analyzeFood,
  getAnalysisHistory,
  getAnalysisById,
} = require("../controllers/foodAnalysisController");
const authMiddleware = require("../middleware/authMiddleware");

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Routes
router.post(
  "/analyze-food",
  authMiddleware,
  upload.single("image"),
  analyzeFood,
);
router.get("/analysis-history", authMiddleware, getAnalysisHistory);
router.get("/analysis/:id", authMiddleware, getAnalysisById);

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  analyzeFood,
  getAnalysisHistory,
  getAnalysisById,
} = require("../controllers/foodAnalysisController");
const authMiddleware = require("../middleware/authMiddleware");

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Routes
router.post(
  "/analyze-food",
  authMiddleware,
  upload.single("image"),
  analyzeFood,
);
router.get("/analysis-history", authMiddleware, getAnalysisHistory);
router.get("/analysis/:id", authMiddleware, getAnalysisById);

module.exports = router;
>>>>>>> origin/main
