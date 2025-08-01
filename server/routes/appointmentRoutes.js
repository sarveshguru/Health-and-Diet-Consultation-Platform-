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
