<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const {
  getAppointmentSummary, // ✅ make sure it's imported
  bookAppointment,
  getUserAppointments,
  getDieticianAppointments,
  updateAppointmentStatus,
  addNotesAndPlan,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");

router.post("/book", protect, bookAppointment);
router.get("/user", protect, getUserAppointments);
router.get("/dietician", protect, getDieticianAppointments);
router.put("/status/:appointmentId", protect, updateAppointmentStatus);
router.put("/notes/:appointmentId", protect, addNotesAndPlan);

// ✅ This is the missing route
router.get("/summary/:dieticianId", protect, getAppointmentSummary);

module.exports = router;
=======
const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getUserAppointments,
  getDieticianAppointments,
  updateAppointmentStatus,
  addNotesAndPlan,
} = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

router.post("/book", protect, bookAppointment);
router.get("/user", protect, getUserAppointments);
router.get("/dietician", protect, getDieticianAppointments);
router.put("/status/:appointmentId", protect, updateAppointmentStatus);
router.put("/notes/:appointmentId", protect, addNotesAndPlan);

module.exports = router;
>>>>>>> origin/main
