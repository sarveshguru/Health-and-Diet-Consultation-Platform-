import React, { useEffect, useState } from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import BMICard from "./BMICard";
import BMIProgressChart from "./BMIProgressChart";
import GoalProgressCard from "./GoalProgressCard";
import API from "../../services/api";

const Progress = () => {
  const [userDetails, setUserDetails] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const fetchUserDetails = async () => {
    try {
      const res = await API.get("/user-details");
      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
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

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 }
      }}
    >
      <Typography 
        variant={isMobile ? "h5" : isTablet ? "h4" : "h3"} 
        component="h2" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 },
          fontWeight: "bold"
        }}
      >
        Your Progress
      </Typography>
      
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 4 }} 
        sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
      >
        <Grid item xs={12}>
          <BMICard userDetails={userDetails} />
        </Grid>
        <Grid item xs={12}>
          <GoalProgressCard latestBMI={bmi} />
        </Grid>
        <Grid item xs={12}>
          <BMIProgressChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Progress;
