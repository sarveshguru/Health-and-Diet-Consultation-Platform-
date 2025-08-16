import React from "react";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

const PERFECT_BMI = 22; // You can adjust this as needed

const GoalProgressCard = ({ latestBMI }) => {
  // Handle cases where latestBMI might not be available yet
  if (latestBMI === undefined || latestBMI === null) {
    return (
      <Card sx={{ 
        height: "100%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.86)",
        borderRadius: 3,
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            BMI Goal Progress
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your Latest BMI: <strong>N/A</strong>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Target BMI: <strong>{PERFECT_BMI}</strong>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{ height: 10, borderRadius: 5, mb: 1 }}
          />
          <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
            No BMI data available to show progress.
          </Typography>
        </CardContent>
      </Card>
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
    <Card
      sx={{
        height: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.89)",
        borderRadius: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          BMI Goal Progress
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, flexDirection: { xs: "column", sm: "row" } }}>
          <Typography variant="body1" gutterBottom>
            Your Latest BMI: <strong>{latestBMI}</strong>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Target BMI: <strong>{PERFECT_BMI}</strong>
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, mb: 1 }}
        />
        <Typography variant="body2" sx={{ mt: 1, textAlign: "center", mb: 1 }}>
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
      </CardContent>
    </Card>
  );
};

export default GoalProgressCard;
