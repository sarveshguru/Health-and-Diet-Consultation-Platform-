import { useEffect, useState } from "react";
import { getUserAppointments } from "../../services/api";
import { Box, Typography, Chip, Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { getColorForChar } from "../../utils/avatarColors";

const UserAppointments = ({ refresh, show = "upcoming" }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getUserAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }
    fetchAppointments();
  }, [refresh]);

  const now = new Date();
  const isUpcoming = (appt) => {
    // Only consider confirmed appointments in the future as upcoming
    return appt.status === "confirmed" && new Date(appt.date) > now;
  };
  const isPast = (appt) => {
    // Completed or cancelled, or confirmed but in the past
    return (
      appt.status === "completed" ||
      appt.status === "cancelled" ||
      (appt.status === "confirmed" && new Date(appt.date) <= now)
    );
  };

  let filtered = appointments;
  if (show === "upcoming") filtered = appointments.filter(isUpcoming);
  if (show === "past") filtered = appointments.filter(isPast);

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        mb: 4,
      }}
    >
      {show === "upcoming" && (
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Upcoming Appointments
        </Typography>
      )}
      {show === "past" && (
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Past Appointments
        </Typography>
      )}
      {filtered.length === 0 && (
        <Typography color="text.secondary" sx={{ ml: 2 }}>
          No appointments found.
        </Typography>
      )}
      {filtered.map((appt) => (
        <Card
          key={appt._id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 2,
            p: 2,
            mb: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                bgcolor: getColorForChar(
                  appt.dietician?.name?.charAt(0).toUpperCase()
                ),
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {appt.dietician?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography fontWeight="bold">
                Dr. {appt.dietician?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {appt.dietician?.specialization || "Dietician"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography color="text.secondary">
              {new Date(appt.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Typography fontWeight="bold">{appt.timeSlot}</Typography>
            <Chip
              label={appt.status}
              color={
                appt.status === "confirmed"
                  ? "success"
                  : appt.status === "cancelled"
                  ? "error"
                  : appt.status === "completed"
                  ? "info"
                  : "warning"
              }
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default UserAppointments;
