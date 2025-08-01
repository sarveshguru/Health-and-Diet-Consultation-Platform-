const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  const { dieticianId, date, timeSlot, notes } = req.body;
  const userId = req.user.id;

  try {
    const newAppointment = await Appointment.create({
      user: userId,
      dietician: dieticianId,
      date,
      timeSlot,
      notes,
    });
    res
      .status(201)
      .json({ message: "Appointment booked", appointment: newAppointment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to book appointment", error: error.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate("dietician", "name email")
      .sort({ date: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error });
  }
};

exports.getDieticianAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ dietician: req.user.id })
      .populate("user", "name email")
      .sort({ date: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch dietician appointments", error });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    // Only the assigned dietician can update
    if (appointment.dietician.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Status updated", appointment });
  } catch (err) {
    res.status(500).json({ message: "Failed to update", error: err.message });
  }
};

exports.addNotesAndPlan = async (req, res) => {
  const { appointmentId } = req.params;
  const { notes, plan } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    // Only the assigned dietician can add notes/plans
    if (appointment.dietician.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    appointment.notes = notes;
    appointment.plan = plan;
    await appointment.save();

    res.status(200).json({ message: "Notes and Plan added", appointment });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
