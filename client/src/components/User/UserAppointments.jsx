import { useEffect, useState } from "react";
import { getUserAppointments } from "../../services/api";
import {
  Box,
  Typography,
  Chip,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { getColorForChar } from "../../utils/avatarColors";

const UserAppointments = ({ refresh, show = "upcoming" }) => {
  const [appointments, setAppointments] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    return appt.status === "confirmed" && new Date(appt.date) > now;
  };
  const isPast = (appt) => {
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
        p: isMobile ? 1 : 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        background: "#fff",
        boxShadow: isMobile ? "none" : "0 2px 8px rgba(0,0,0,0.89)",
        mb: 2,
      }}
    >
      {show === "upcoming" && (
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          mb={isMobile ? 1 : 2}
          sx={{ fontSize: isMobile ? "1.1rem" : "1.25rem" }}
        >
          Upcoming Appointments
        </Typography>
      )}
      {show === "past" && (
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          mb={isMobile ? 1 : 2}
          sx={{ fontSize: isMobile ? "1.1rem" : "1.25rem" }}
        >
          Past Appointments
        </Typography>
      )}
      {filtered.length === 0 && (
        <Typography
          color="text.secondary"
          sx={{
            ml: isMobile ? 0 : 2,
            fontSize: isMobile ? "0.875rem" : "1rem",
          }}
        >
          No appointments found.
        </Typography>
      )}
      {filtered.map((appt) => (
        <Card
          key={appt._id}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            borderRadius: 2,
            p: isMobile ? 1.5 : 2,
            mb: 1.5,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            gap: isMobile ? 1 : 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: isMobile ? "100%" : "auto",
              mb: isMobile ? 1 : 0,
            }}
          >
            <Avatar
              sx={{
                width: isMobile ? 40 : 50,
                height: isMobile ? 40 : 50,
                bgcolor: getColorForChar(
                  appt.dietician?.name?.charAt(0).toUpperCase(),
                ),
                color: "white",
                fontSize: isMobile ? 20 : 24,
                fontWeight: "bold",
              }}
            >
              {appt.dietician?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box
              sx={{
                ml: isMobile ? 1.5 : 2,
                flex: isMobile ? 1 : "none",
              }}
            >
              <Typography
                fontWeight="bold"
                sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
              >
                Dr. {appt.dietician?.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}
              >
                {appt.dietician?.specialization || "Dietician"}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              textAlign: isMobile ? "left" : "right",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Typography
              color="text.secondary"
              sx={{ fontSize: isMobile ? "0.8rem" : "0.875rem" }}
            >
              {new Date(appt.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
            <Typography
              fontWeight="bold"
              sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
            >
              {appt.timeSlot}
            </Typography>
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
              size={isMobile ? "small" : "medium"}
              sx={{
                mt: 1,
                fontSize: isMobile ? "0.75rem" : "0.875rem",
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default UserAppointments;
