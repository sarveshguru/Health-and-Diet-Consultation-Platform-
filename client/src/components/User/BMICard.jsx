import React from "react";
import { Typography, LinearProgress, Card, CardContent } from "@mui/material";

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label: "Underweight", color: "#60a5fa" };
  if (bmi < 25) return { label: "Normal Weight", color: "#22c55e" };
  if (bmi < 30) return { label: "Overweight", color: "#facc15" };
  if (bmi < 35) return { label: "Obese I", color: "#fb923c" };
  if (bmi < 40) return { label: "Obese II", color: "#f87171" };
  return { label: "Obese III", color: "#ef4444" };
};

const BMICard = ({ userDetails }) => {
  // Support array for weight/height
  const getLatest = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : null;
  const weight = Array.isArray(userDetails?.weight)
    ? getLatest(userDetails.weight)
    : userDetails?.weight;
  const height = Array.isArray(userDetails?.height)
    ? getLatest(userDetails.height)
    : userDetails?.height;
  if (!weight || !height) return null;
  const heightM = height / 100;
  const bmi = Number((weight / (heightM * heightM)).toFixed(2));
  const category = getBMICategory(bmi);

  return (
    <Card sx={{ 
      height: "100%", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.89)",
      borderRadius: 3,
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-2px)",
      }
    }}>
      <CardContent sx={{ 
        p: { xs: 2, sm: 3 },
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          BMI: {bmi}
        </Typography>
        <Typography 
          color={category.color} 
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {category.label}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min((bmi / 40) * 100, 100)}
          sx={{
            height: 10,
            borderRadius: 5,
            background: "#e5e7eb",
            "& .MuiLinearProgress-bar": { backgroundColor: category.color },
            mb: 2,
          }}
        />
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ mt: "auto" }}
        >
          BMI is a measure of body fat based on height and weight. It is a
          screening tool, not a diagnostic of body composition.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BMICard;
