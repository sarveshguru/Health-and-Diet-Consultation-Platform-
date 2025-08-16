import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import UserAppointments from "../../components/User/UserAppointments";

const Appointments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box 
      p={isMobile ? 1 : 2}
      sx={{
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        gutterBottom
        sx={{
          fontSize: isMobile ? "1.25rem" : "1.5rem",
          fontWeight: "bold",
          mb: isMobile ? 1 : 2,
        }}
      >
        My Appointments
      </Typography>
      
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: isMobile ? 2 : 3 
      }}>
        <UserAppointments show="upcoming" />
        <UserAppointments show="past" />
      </Box>
    </Box>
  );
};

export default Appointments;
