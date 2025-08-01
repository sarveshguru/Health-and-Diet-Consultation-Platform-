import React from "react";
import { Box, Typography } from "@mui/material";

import UserAppointments from "../../components/User/UserAppointments";

const Appointments = () => {
  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        My Appointments
      </Typography>
      <UserAppointments show="upcoming" />
      <UserAppointments show="past" />
    </Box>
  );
};

export default Appointments;
