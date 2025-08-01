import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, Card } from "@mui/material";
import { getDieticianAppointments } from "../../services/api";

const PatientList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const data = await getDieticianAppointments();
        setAppointments(data);
      } catch (err) {
        setAppointments([]);
      }
    }
    fetchAppointments();
  }, []);

  // Filter confirmed appointments and get unique patients
  const confirmedAppointments = appointments.filter(
    (appt) => appt.status === "confirmed" && appt.user,
  );
  // Map to user and deduplicate by user._id
  const uniquePatientsMap = {};
  confirmedAppointments.forEach((appt) => {
    if (appt.user && appt.user._id) {
      uniquePatientsMap[appt.user._id] = appt.user;
    }
  });
  const uniquePatients = Object.values(uniquePatientsMap);

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          My Patients
        </Typography>
        {uniquePatients.length === 0 ? (
          <Typography color="text.secondary">No patients assigned.</Typography>
        ) : (
          <Box>
            {uniquePatients.map((patient) => (
              <Card
                key={patient._id}
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
                      width: 48,
                      height: 48,
                      fontSize: 24,
                      bgcolor: "primary.main",
                    }}
                  >
                    {patient.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ ml: 2 }}>
                    <Typography fontWeight="bold">{patient.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {patient.email}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography color="text.secondary">
                    Age: {patient.age || "-"}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PatientList;
