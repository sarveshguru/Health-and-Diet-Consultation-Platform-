<<<<<<< HEAD
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const PERFECT_BMI = 22; // You can adjust this as needed

const GoalProgressCard = ({ latestBMI }) => {
  // Handle cases where latestBMI might not be available yet
  if (latestBMI === undefined || latestBMI === null) {
    return (
      <Box
        sx={{
          flex: "1 1 400px",
          p: 3,
          mb: 4,
          border: "1px solid #e0e0e0",
          borderRadius: 3,
          minWidth:400,
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.86)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4} gutterBottom>
          BMI Goal Progress
        </Typography>
        <Typography variant="body1">
          Your Latest BMI: <strong>N/A</strong>
        </Typography>
        <Typography variant="body1">
          Target BMI: <strong>{PERFECT_BMI}</strong>
        </Typography>
        <LinearProgress
          variant="determinate"
          value={0}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
          No BMI data available to show progress.
        </Typography>
      </Box>
    );
  }

  
  const bmiDifference = Math.abs(latestBMI - PERFECT_BMI);

  const maxBmiDeviation = 20; 

  let progress = 100 - (bmiDifference / maxBmiDeviation) * 100;

  progress = Math.max(0, Math.min(100, progress));

  if (bmiDifference <= 0.5) {
    progress = 100;
  }

  return (
    <Box
      sx={{
        flex: "1 1 400px",
        p: 3,
        mb:4,
        minWidth:400,
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.89)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={4} gutterBottom>
        BMI Goal Progress
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body1">
          Your Latest BMI: <strong>{latestBMI}</strong>
        </Typography>
        <Typography variant="body1">
          Target BMI: <strong>{PERFECT_BMI}</strong>
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
        {progress.toFixed(0)}% Towards Your Goal
      </Typography>
      {latestBMI && (
        <Typography
          variant="caption"
          display="block"
          sx={{
            mt: 1,
            textAlign: "center",
            color:
              latestBMI === PERFECT_BMI ? "success.main" : "text.secondary",
          }}
        >
          {latestBMI === PERFECT_BMI
            ? "You've reached your perfect BMI! Excellent!"
            : latestBMI < PERFECT_BMI
            ? `You are ${Math.abs(PERFECT_BMI - latestBMI).toFixed(
                1,
              )} BMI points below your target.`
            : `You are ${Math.abs(latestBMI - PERFECT_BMI).toFixed(
                1,
              )} BMI points above your target.`}
        </Typography>
      )}
    </Box>
  );
};

export default GoalProgressCard;
=======
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const PERFECT_BMI = 22; // You can adjust this as needed

const GoalProgressCard = ({ latestBMI }) => {
  // Handle cases where latestBMI might not be available yet
  if (latestBMI === undefined || latestBMI === null) {
    return (
      <Box
        sx={{
          p: 3,
          mb: 4,
          border: "1px solid #e0e0e0",
          borderRadius: 3,
          minWidth: 400,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4} gutterBottom>
          BMI Goal Progress
        </Typography>
        <Typography variant="body1">
          Your Latest BMI: <strong>N/A</strong>
        </Typography>
        <Typography variant="body1">
          Target BMI: <strong>{PERFECT_BMI}</strong>
        </Typography>
        <LinearProgress
          variant="determinate"
          value={0}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
          No BMI data available to show progress.
        </Typography>
      </Box>
    );
  }

  // Calculate the absolute difference from the perfect BMI
  const bmiDifference = Math.abs(latestBMI - PERFECT_BMI);

  // Determine the maximum possible difference for the progress bar.
  // If the BMI difference is greater than this, progress will be 0%.
  // Increased to 20 to accommodate a wider range of BMIs (e.g., from 2 to 42 if PERFECT_BMI is 22).
  const maxBmiDeviation = 20; // e.g., if BMI is 2 or 42, progress is 0%

  // Calculate progress: closer to 0 difference means higher progress.
  // We want 100% when bmiDifference is 0, and 0% when bmiDifference >= maxBmiDeviation.
  let progress = 100 - (bmiDifference / maxBmiDeviation) * 100;

  // Ensure progress is not less than 0 and not more than 100
  progress = Math.max(0, Math.min(100, progress));

  // If latestBMI is very close to PERFECT_BMI, set progress to 100%
  // This handles small floating point inaccuracies and makes the bar look complete.
  if (bmiDifference <= 0.5) {
    progress = 100;
  }

  return (
    <Box
      sx={{
        p: 3,
        mb: 4,
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        minWidth: 400,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={4} gutterBottom>
        BMI Goal Progress
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body1">
          Your Latest BMI: <strong>{latestBMI}</strong>
        </Typography>
        <Typography variant="body1">
          Target BMI: <strong>{PERFECT_BMI}</strong>
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
        {progress.toFixed(0)}% Towards Your Goal
      </Typography>
      {latestBMI && (
        <Typography
          variant="caption"
          display="block"
          sx={{
            mt: 1,
            textAlign: "center",
            color:
              latestBMI === PERFECT_BMI ? "success.main" : "text.secondary",
          }}
        >
          {latestBMI === PERFECT_BMI
            ? "You've reached your perfect BMI! Excellent!"
            : latestBMI < PERFECT_BMI
            ? `You are ${Math.abs(PERFECT_BMI - latestBMI).toFixed(
                1,
              )} BMI points below your target.`
            : `You are ${Math.abs(latestBMI - PERFECT_BMI).toFixed(
                1,
              )} BMI points above your target.`}
        </Typography>
      )}
    </Box>
  );
};

export default GoalProgressCard;
>>>>>>> origin/main
