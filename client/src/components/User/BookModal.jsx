<<<<<<< HEAD
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { bookAppointment } from "../../services/api"; // Adjust path if needed

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  p: 3,
};

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const BookModal = ({ open, handleClose, dieticianId, onBooked }) => {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const handleSubmit = async () => {
    try {
      if (!date || !slot) {
        alert("Please select a date and time.");
        return;
      }

      const appointmentData = {
        dieticianId,
        date,
        timeSlot: slot,
      };

      await bookAppointment(appointmentData);

      alert("Appointment booked successfully!");
      handleClose();
      if (onBooked) onBooked(); // <-- notify parent to refresh
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Book Consultation
        </Typography>
        <TextField
          fullWidth
          label="Select Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Select Time Slot"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          sx={{ mb: 2 }}
        >
          {timeSlots.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={!date || !slot}
        >
          Book Now
        </Button>
      </Box>
    </Modal>
  );
};

export default BookModal;
=======
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { bookAppointment } from "../../services/api"; // Adjust path if needed

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#fff",
  borderRadius: 3,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  p: 3,
};

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const BookModal = ({ open, handleClose, dieticianId, onBooked }) => {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const handleSubmit = async () => {
    try {
      if (!date || !slot) {
        alert("Please select a date and time.");
        return;
      }

      const appointmentData = {
        dieticianId,
        date,
        timeSlot: slot,
      };

      await bookAppointment(appointmentData);

      alert("Appointment booked successfully!");
      handleClose();
      if (onBooked) onBooked(); // <-- notify parent to refresh
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Book Consultation
        </Typography>
        <TextField
          fullWidth
          label="Select Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Select Time Slot"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          sx={{ mb: 2 }}
        >
          {timeSlots.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={!date || !slot}
        >
          Book Now
        </Button>
      </Box>
    </Modal>
  );
};

export default BookModal;
>>>>>>> origin/main
