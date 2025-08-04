import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import API, { updateUserDetailField } from "../../services/api";

import BookModal from "../../components/User/BookModal";
import UserAppointments from "../../components/User/UserAppointments";
import BMIProgressChart from "../../components/User/BMIProgressChart";
import DataCard from "../../components/Layout/DataCard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LocalDrink from "@mui/icons-material/LocalDrink";
import DieticianList from "../../components/User/DieticianList";
import GoalProgressCard from "../../components/User/GoalProgressCard";

const UserDashboard = () => {
  const [dieticians, setDieticians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/me"); // Adjust endpoint if needed
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUser();
  }, []);

  const fetchDieticians = async () => {
    try {
      const res = await API.get("/dietician");
      setDieticians(res.data);
    } catch (error) {
      console.error("Error fetching dieticians", error);
    } finally {
      setLoading(false);
    }
  };

  // Use API service to fetch user details
  const fetchUserDetails = async () => {
    try {
      const res = await API.get("/user-details");
      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchDieticians();
    fetchUserDetails();
  }, []);

  // Use latest value for BMI calculation
  let bmi = null;
  const getLatest = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : null;
  if (
    Array.isArray(userDetails?.weight) &&
    Array.isArray(userDetails?.height) &&
    userDetails.weight.length &&
    userDetails.height.length
  ) {
    const heightM = getLatest(userDetails.height) / 100;
    bmi = (getLatest(userDetails.weight) / (heightM * heightM)).toFixed(2);
  }
  // const bmiCategory = getBMICategory(bmi);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDieticianId, setSelectedDieticianId] = useState(null);
  const [refreshAppointments, setRefreshAppointments] = useState(false);

  const handleBook = (dieticianId) => {
    setSelectedDieticianId(dieticianId);
    setModalOpen(true);
  };

  const handleAppointmentBooked = () => {
    setRefreshAppointments((prev) => !prev); // Toggle to trigger refresh
  };

  // Handler for updating user detail fields from dashboard
  const handleUpdateField = async (field, value) => {
    try {
      await updateUserDetailField(field, value);
      fetchUserDetails(); // Refresh data
      // If weight or height is updated, also add a new BMI record
      if ((field === "weight" || field === "height") && userDetails) {
        const latestWeight =
          field === "weight" ? Number(value) : getLatest(userDetails.weight);
        const latestHeight =
          field === "height" ? Number(value) : getLatest(userDetails.height);
        if (latestWeight && latestHeight) {
          const heightM = latestHeight / 100;
          const bmi = (latestWeight / (heightM * heightM)).toFixed(2);
          // Add BMI record to history
          await API.post("/bmi-history", { bmi: Number(bmi) });
        }
      }
    } catch (err) {
      alert("Failed to update " + field);
    }
  };

  return (
    <Box
      p={3}
      sx={{
        background: "#f5f6fa",
        minHeight: "100vh",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
        <Typography variant="h4">
          Welcome,{" "}
          <span style={{ fontWeight: "bold", color: "#1976d2" }}>
            {user?.name}!
          </span>{" "}
          <WavingHandIcon
            sx={{
              color: "#ffb300",
              fontSize: 48,
              mr: 2,
              animation: "wave 1.5s infinite",
              "@keyframes wave": {
                "0%": { transform: "rotate(0deg)" },
                "10%": { transform: "rotate(14deg)" },
                "20%": { transform: "rotate(-8deg)" },
                "30%": { transform: "rotate(14deg)" },
                "40%": { transform: "rotate(-4deg)" },
                "50%": { transform: "rotate(10deg)" },
                "60%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(0deg)" },
              },
              transformOrigin: "70% 70%",
              display: "inline-block",
            }}
          />
        </Typography>
      </Box>

      <Grid container spacing={4} mb={3}>
        <Grid item xs={12} md={4}>
          <DataCard
            label="Weight"
            value={getLatest(userDetails?.weight)}
            unit="kg"
            icon={<FitnessCenterIcon sx={{ color: "#3f51b5", fontSize: 40 }} />}
            editable
            onEdit={(val) => handleUpdateField("weight", val)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DataCard
            label="Height"
            value={getLatest(userDetails?.height)}
            unit="cm"
            icon={<StraightenIcon sx={{ color: "#43a047", fontSize: 40 }} />}
            editable
            onEdit={(val) => handleUpdateField("height", val)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DataCard
            label="BMI"
            value={bmi}
            icon={<MonitorWeightIcon sx={{ color: "#fbc02d", fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DataCard
            label="Water Intake"
            value={getLatest(userDetails?.waterIntake)}
            unit="Ltr"
            icon={<LocalDrink sx={{ color: "#0288d1", fontSize: 40 }} />}
            editable
            onEdit={(val) => handleUpdateField("waterIntake", val)}
          />
        </Grid>
      </Grid>

      <Box mb={3}>
        <GoalProgressCard latestBMI={bmi} />
      </Box>

      <Box mb={3}>
        <UserAppointments refresh={refreshAppointments} />
      </Box>

      <Box mb={3}>
        <DieticianList
          dieticians={dieticians}
          loading={loading}
          onBook={handleBook}
        />
      </Box>

      <Box mb={3}>
        <BMIProgressChart latestBMI={bmi} />
      </Box>

      <BookModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        dieticianId={selectedDieticianId}
        onBooked={handleAppointmentBooked}
      />
    </Box>
  );
};

export default UserDashboard;
