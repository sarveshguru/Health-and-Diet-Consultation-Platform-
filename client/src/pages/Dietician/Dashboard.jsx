<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import UpcomingAppointmentsPreview from "../../components/Dietician/UpcomingAppointmentsPreview";
import AppointmentsChart from "../../components/Dietician/AppointmentsChart";
import DieticianRatingsChart from "../../components/Dietician/DieticianRatingsChart";
import { Box, Grid, Paper, Typography } from "@mui/material";
import API from "../../services/api";

/**
 * DieticianDashboard component displays appointments and a chart for dieticians.
 */
function DieticianDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    avgRating: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await API.get("/dietician/stats");
        setStats(res.data);
      } catch {
        setStats({ patients: 0, appointments: 0, avgRating: 0 });
      }
    }
    fetchStats();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Dietician Dashboard
      </Typography>
      <Grid container columns={12} columnSpacing={4} mb={4}>
        <Grid columns={5} sx={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.89)", mr: 3 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h4" color="primary">
              {stats.patients}
            </Typography>
          </Paper>
        </Grid>
        <Grid columns={5} sx={{ boxShadow: "0 1px 4px rgba(0, 0, 0, 0.89)", mr: 3 }}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Appointments</Typography>
            <Typography variant="h4" color="primary">
              {stats.appointments}
            </Typography>
          </Paper>
        </Grid>
        {/* <Grid columns={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Average Rating</Typography>
            <Typography variant="h4" color="primary">
              {stats.avgRating?.toFixed(1) || "-"}
            </Typography>
          </Paper>
        </Grid> */}
      </Grid>
      <Grid container columns={12} columnSpacing={4}>
        <Grid columns={6} sx={{ boxShadow: "2px 1px 4px rgba(0, 0, 0, 0.89)", mr: 3 }}>
          <AppointmentsChart />
        </Grid>
        {/* <Grid columns={6}>
          <DieticianRatingsChart />
        </Grid> */}
      </Grid>
      <Box mt={5} >
        <UpcomingAppointmentsPreview />
      </Box>
    </Box>
  );
}

export default DieticianDashboard;
=======
import React, { useEffect, useState } from "react";
import UpcomingAppointmentsPreview from "../../components/Dietician/UpcomingAppointmentsPreview";
import AppointmentsChart from "../../components/Dietician/AppointmentsChart";
import DieticianRatingsChart from "../../components/Dietician/DieticianRatingsChart";
import { Box, Grid, Paper, Typography } from "@mui/material";
import API from "../../services/api";

/**
 * DieticianDashboard component displays appointments and a chart for dieticians.
 */
function DieticianDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    avgRating: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await API.get("/dietician/stats");
        setStats(res.data);
      } catch {
        setStats({ patients: 0, appointments: 0, avgRating: 0 });
      }
    }
    fetchStats();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Dietician Dashboard
      </Typography>
      <Grid container columns={12} columnSpacing={3} mb={4}>
        <Grid columns={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h4" color="primary">
              {stats.patients}
            </Typography>
          </Paper>
        </Grid>
        <Grid columns={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Appointments</Typography>
            <Typography variant="h4" color="primary">
              {stats.appointments}
            </Typography>
          </Paper>
        </Grid>
        <Grid columns={4}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Average Rating</Typography>
            <Typography variant="h4" color="primary">
              {stats.avgRating?.toFixed(1) || "-"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container columns={12} columnSpacing={3}>
        <Grid columns={6}>
          <AppointmentsChart />
        </Grid>
        <Grid columns={6}>
          <DieticianRatingsChart />
        </Grid>
      </Grid>
      <Box mt={5}>
        <UpcomingAppointmentsPreview />
      </Box>
    </Box>
  );
}

export default DieticianDashboard;
>>>>>>> origin/main
