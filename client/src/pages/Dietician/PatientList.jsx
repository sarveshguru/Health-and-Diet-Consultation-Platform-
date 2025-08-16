import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDieticianAppointments } from "../../services/api";

const PatientList = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

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

  const handlePatientClick = (patientId) => {
    navigate(`/dietician/user-profile?userId=${patientId}`);
  };

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
    <Box
      maxWidth={{ xs: "100%", sm: 600, md: 700 }}
      mx="auto"
      mt={{ xs: 2, sm: 3, md: 5 }}
      px={{ xs: 1, sm: 0 }}
    >
      <Paper
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 3,
          boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
        >
          My Patients
        </Typography>
        {uniquePatients.length === 0 ? (
          <Typography color="text.secondary">No patients assigned.</Typography>
        ) : (
          <Box>
            {uniquePatients.map((patient) => (
              <Card
                key={patient._id}
                onClick={() => handlePatientClick(patient._id)}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                  borderRadius: 2,
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { xs: "flex-start", sm: "center" },
                    width: { xs: "100%", sm: "auto" },
                    mb: { xs: 1, sm: 0 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      fontSize: { xs: 20, sm: 24 },
                      bgcolor: "primary.main",
                      flexShrink: 0,
                    }}
                  >
                    {patient.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box
                    sx={{
                      ml: { xs: 1.5, sm: 2 },
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {patient.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {patient.email}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    textAlign: { xs: "left", sm: "right" },
                    width: { xs: "100%", sm: "auto" },
                    mt: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    View Profile
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
