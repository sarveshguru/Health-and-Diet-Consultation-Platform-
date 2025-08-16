import { useEffect, useState } from "react";
import {
  getDieticianAppointments,
  updateAppointmentStatus,
  addNotesAndPlan,
} from "../../services/api";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DieticianAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [noteText, setNoteText] = useState("");
  const [planText, setPlanText] = useState("");
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDieticianAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Error:", err);
      }
    }
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      const data = await getDieticianAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleNotesSubmit = async (id) => {
    await addNotesAndPlan(id, noteText, planText);
    const data = await getDieticianAppointments();
    setAppointments(data);
    setNoteText("");
    setPlanText("");
    setActiveNoteId(null);
  };

  // Summary logic
  const today = new Date();
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
  const isSameWeek = (d1, d2) => {
    // Get Sunday of the week for both dates
    const getWeekStart = (d) => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - date.getDay());
      return date;
    };
    return getWeekStart(d1).getTime() === getWeekStart(d2).getTime();
  };
  const totalToday = appointments.filter((a) =>
    isSameDay(new Date(a.date), today),
  ).length;
  const totalThisWeek = appointments.filter((a) =>
    isSameWeek(new Date(a.date), today),
  ).length;
  const totalPending = appointments.filter(
    (a) => a.status === "pending",
  ).length;
  const totalCompleted = appointments.filter(
    (a) => a.status === "completed",
  ).length;
  const totalNoShows = appointments.filter(
    (a) => a.status === "cancelled",
  ).length;
  const now = new Date();
  const isUpcoming = (appt) => {
    const apptDate = new Date(appt.date);
    return appt.status === "confirmed" && apptDate >= now;
  };
  const isPast = (appt) => {
    const apptDate = new Date(appt.date);
    return (
      appt.status === "completed" ||
      (appt.status === "confirmed" && apptDate < now)
    );
  };
  const isPending = (appt) => appt.status === "pending";

  let filtered = appointments;
  if (tab === 0) filtered = appointments.filter(isUpcoming);
  if (tab === 1) filtered = appointments.filter(isPast);
  if (tab === 2) filtered = appointments.filter(isPending);

  return (
    <Box p={{ xs: 2, sm: 3, md: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Appointments with Patients
      </Typography>
      <Box sx={{ display: "flex", gap: { xs: 2, sm: 3, md: 4 }, mb: 3, flexWrap: "wrap" }}>
        <Box
          sx={{
            flex: { xs: "1 1 calc(50% - 8px)", sm: "1 1 160px" },
            p: 2,
            bgcolor: "#f5f6fa",
            borderRadius: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Today
          </Typography>
          <Typography variant="h6" color="primary.main">
            {totalToday}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: { xs: "1 1 calc(50% - 8px)", sm: "1 1 160px" },
            p: 2,
            bgcolor: "#f5f6fa",
            borderRadius: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            This Week
          </Typography>
          <Typography variant="h6" color="primary.main">
            {totalThisWeek}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: { xs: "1 1 calc(50% - 8px)", sm: "1 1 160px" },
            p: 2,
            bgcolor: "#f5f6fa",
            borderRadius: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Pending
          </Typography>
          <Typography variant="h6" color="warning.main">
            {totalPending}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: { xs: "1 1 calc(50% - 8px)", sm: "1 1 160px" },
            p: 2,
            bgcolor: "#f5f6fa",
            borderRadius: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Completed
          </Typography>
          <Typography variant="h6" color="success.main">
            {totalCompleted}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: { xs: "1 1 calc(50% - 8px)", sm: "1 1 160px" },
            p: 2,
            bgcolor: "#f5f6fa",
            borderRadius: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            No-Shows
          </Typography>
          <Typography variant="h6" color="error.main">
            {totalNoShows}
          </Typography>
        </Box>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Upcoming" />
        <Tab label="Past" />
        <Tab label="Pending" />
      </Tabs>
      {filtered.length === 0 && (
        <Typography color="text.secondary" sx={{ ml: 2 }}>
          No appointments found.
        </Typography>
      )}
      {filtered.map((appt) => {
        // Color-coded status
        let statusColor = "default";
        if (appt.status === "pending") statusColor = "warning";
        if (appt.status === "confirmed") statusColor = "info";
        if (appt.status === "completed") statusColor = "success";
        if (appt.status === "cancelled") statusColor = "error";

        // Highlight urgent/soon appointments (within next 2 hours)
        let urgent = false;
        if (appt.status === "confirmed" && appt.date && appt.timeSlot) {
          const apptDate = new Date(appt.date);
          // Parse timeSlot (e.g., "14:00-15:00")
          const startTime = appt.timeSlot.split("-")[0];
          if (startTime) {
            const [h, m] = startTime.split(":");
            apptDate.setHours(Number(h), Number(m), 0, 0);
            const diff = (apptDate - new Date()) / (1000 * 60 * 60); // hours
            if (diff >= 0 && diff <= 2) urgent = true;
          }
        }
        const targetedUserName = appt.user.name;

        // console.log(targetedUserName);
        return (
          <Paper
            key={appt._id}
            sx={{
              p: 3,
              mb: 3,
              border: urgent ? "2px solid #ff9800" : undefined,
              boxShadow: urgent
                ? "0 0 20px 2px #ffe0b2"
                : "0 1px 4px rgba(0,0,0,0.89)",
              background: urgent ? "#fff8e1" : "#fff",
              transition: "all 0.2s",
            }}
            elevation={urgent ? 6 : 3}
          >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1, flexWrap: "wrap" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              <strong>Patient:</strong> {appt.user?.name}
            </Typography>
            <Chip
              label={
                appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
              }
              color={statusColor}
              size="small"
              sx={{ fontWeight: "bold" }}
            />
            {urgent && (
              <Chip
                label="Urgent"
                color="warning"
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            )}
          </Box>
            <Typography variant="body2" gutterBottom>
              <strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Time:</strong> {appt.timeSlot}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Note:</strong> {appt.notes || "No note"}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Plan:</strong> {appt.plan || "No plan"}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: { xs: 1, sm: 2 }, flexWrap: "wrap" }}>
              {/* Approve/Reject for pending */}
              {appt.status === "pending" && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleStatusUpdate(appt._id, "confirmed")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleStatusUpdate(appt._id, "cancelled")}
                  >
                    Reject
                  </Button>
                </>
              )}
              {/* Mark as completed for confirmed */}
              {appt.status === "confirmed" && (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleStatusUpdate(appt._id, "completed")}
                >
                  Mark as Completed
                </Button>
              )}
              {/* Add/Edit Notes & Plan for confirmed or completed */}
              {(appt.status === "confirmed" || appt.status === "completed") && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => setActiveNoteId(appt._id)}
                >
                  Add/Edit Notes & Plan
                </Button>
              )}
              {/* View Patient */}
              {appt.user?._id && (
                <Button
                  variant="outlined"
                  color="info"
                  size="small"
                  onClick={() =>
                    navigate(`/dietician/user-profile?userId=${appt.user._id}`)
                  }
                >
                  View Patient
                </Button>
              )}
              {/* Start Chat */}
              {appt.user?._id && appt.status === "confirmed" && (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() =>
                    navigate(
                      `/dietician/chat?userId=${
                        appt.user._id
                      }&userName=${encodeURIComponent(
                        targetedUserName || "User",
                      )}`,
                    )
                  }
                >
                  Start Chat
                </Button>
              )}
            </Box>
            {activeNoteId === appt._id && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Notes"
                  multiline
                  rows={3}
                  fullWidth
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Diet Plan"
                  multiline
                  rows={3}
                  fullWidth
                  value={planText}
                  onChange={(e) => setPlanText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleNotesSubmit(appt._id)}
                >
                  Save Notes & Plan
                </Button>
              </Box>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default DieticianAppointments;
