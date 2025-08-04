<<<<<<< HEAD
import { useEffect, useState } from "react";
import { getDieticianAppointments } from "../../services/api";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpcomingAppointmentsPreview = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDieticianAppointments();
        setAppointments(data);
      } catch (err) {
        setAppointments([]);
      }
    }
    fetchData();
  }, []);

  const now = new Date();
  const isUpcoming = (appt) => {
    const apptDate = new Date(appt.date);
    return appt.status === "confirmed" && apptDate >= now;
  };
  const isPending = (appt) => appt.status === "pending";
  const upcoming = appointments.filter(isUpcoming).slice(0, 5);
  const pending = appointments.filter(isPending).slice(0, 5);

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Upcoming Appointments
      </Typography>
      {upcoming.length === 0 ? (
        <Typography color="text.secondary">
          No upcoming appointments.
        </Typography>
      ) : (
        upcoming.map((appt) => {
          let statusColor = "info";
          return (
            <Paper
              key={appt._id}
              sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: " 0 1px 4px rgba(0,0,0,0.89)"}}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, gap: 2, }}
              >
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
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
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
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                {/* View Patient */}
                {appt.user?._id && (
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() =>
                      navigate(
                        `/dietician/user-profile?userId=${appt.user._id}`,
                      )
                    }
                  >
                    View Patient
                  </Button>
                )}
                {/* Start Chat (only for confirmed) */}
                {appt.user?._id && appt.status === "confirmed" && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/dietician/chat?userId=${appt.user._id}`)
                    }
                  >
                    Start Chat
                  </Button>
                )}
              </Box>
            </Paper>
          );
        })
      )}
      <Typography variant="h6" fontWeight="bold" mb={2} mt={4}>
        Pending Appointments
      </Typography>
      {pending.length === 0 ? (
        <Typography color="text.secondary">No pending appointments.</Typography>
      ) : (
        pending.map((appt) => {
          let statusColor = "warning";
          return (
            <Paper
              key={appt._id}
              sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: " 0 1px 4px rgba(0,0,0,0.89)" }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, gap: 2 }}
              >
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
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
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
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                {/* Confirm for pending */}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={async () => {
                    try {
                      await import("../../services/api").then((api) =>
                        api.updateAppointmentStatus(appt._id, "confirmed"),
                      );
                      setAppointments(await getDieticianAppointments());
                    } catch {}
                  }}
                >
                  Confirm
                </Button>
                {/* View Patient */}
                {appt.user?._id && (
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() =>
                      navigate(
                        `/dietician/user-profile?userId=${appt.user._id}`,
                      )
                    }
                  >
                    View Patient
                  </Button>
                )}
                {/* Start Chat (only for confirmed) */}
                {appt.user?._id && appt.status === "confirmed" && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/dietician/chat?userId=${appt.user._id}`)
                    }
                  >
                    Start Chat
                  </Button>
                )}
              </Box>
            </Paper>
          );
        })
      )}
    </Box>
  );
};

export default UpcomingAppointmentsPreview;
=======
import { useEffect, useState } from "react";
import { getDieticianAppointments } from "../../services/api";
import { Box, Typography, Paper, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpcomingAppointmentsPreview = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDieticianAppointments();
        setAppointments(data);
      } catch (err) {
        setAppointments([]);
      }
    }
    fetchData();
  }, []);

  const now = new Date();
  const isUpcoming = (appt) => {
    const apptDate = new Date(appt.date);
    return appt.status === "confirmed" && apptDate >= now;
  };
  const isPending = (appt) => appt.status === "pending";
  const upcoming = appointments.filter(isUpcoming).slice(0, 5);
  const pending = appointments.filter(isPending).slice(0, 5);

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Upcoming Appointments
      </Typography>
      {upcoming.length === 0 ? (
        <Typography color="text.secondary">
          No upcoming appointments.
        </Typography>
      ) : (
        upcoming.map((appt) => {
          let statusColor = "info";
          return (
            <Paper
              key={appt._id}
              sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, gap: 2 }}
              >
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
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
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
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                {/* View Patient */}
                {appt.user?._id && (
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() =>
                      navigate(
                        `/dietician/user-profile?userId=${appt.user._id}`,
                      )
                    }
                  >
                    View Patient
                  </Button>
                )}
                {/* Start Chat (only for confirmed) */}
                {appt.user?._id && appt.status === "confirmed" && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/dietician/chat?userId=${appt.user._id}`)
                    }
                  >
                    Start Chat
                  </Button>
                )}
              </Box>
            </Paper>
          );
        })
      )}
      <Typography variant="h6" fontWeight="bold" mb={2} mt={4}>
        Pending Appointments
      </Typography>
      {pending.length === 0 ? (
        <Typography color="text.secondary">No pending appointments.</Typography>
      ) : (
        pending.map((appt) => {
          let statusColor = "warning";
          return (
            <Paper
              key={appt._id}
              sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: 2 }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, gap: 2 }}
              >
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
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
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
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                {/* Confirm for pending */}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={async () => {
                    try {
                      await import("../../services/api").then((api) =>
                        api.updateAppointmentStatus(appt._id, "confirmed"),
                      );
                      setAppointments(await getDieticianAppointments());
                    } catch {}
                  }}
                >
                  Confirm
                </Button>
                {/* View Patient */}
                {appt.user?._id && (
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() =>
                      navigate(
                        `/dietician/user-profile?userId=${appt.user._id}`,
                      )
                    }
                  >
                    View Patient
                  </Button>
                )}
                {/* Start Chat (only for confirmed) */}
                {appt.user?._id && appt.status === "confirmed" && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() =>
                      navigate(`/dietician/chat?userId=${appt.user._id}`)
                    }
                  >
                    Start Chat
                  </Button>
                )}
              </Box>
            </Paper>
          );
        })
      )}
    </Box>
  );
};

export default UpcomingAppointmentsPreview;
>>>>>>> origin/main
