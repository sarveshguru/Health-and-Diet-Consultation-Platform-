const Dietician = require("../models/Dietician");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

// GET /api/dietician/stats
exports.getDieticianStats = async (req, res) => {
  try {
    // Count unique patients from appointments
    const appointments = await Appointment.find({ dietician: req.user.id });
    const patientIds = [...new Set(appointments.map((a) => a.user.toString()))];
    const patients = patientIds.length;
    const appointmentsCount = appointments.length;
    // Calculate average rating (if ratings exist on appointments)
    const ratings = appointments
      .map((a) => a.rating)
      .filter((r) => typeof r === "number");
    const avgRating = ratings.length
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;
    res.json({ patients, appointments: appointmentsCount, avgRating });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
