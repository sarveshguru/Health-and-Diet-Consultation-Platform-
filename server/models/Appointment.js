const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dietician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dietician",
      required: true,
    },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    notes: { type: String }, // keep only this
    plan: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
