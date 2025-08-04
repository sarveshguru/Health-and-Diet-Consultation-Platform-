<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CloudUpload, Fastfood } from "@mui/icons-material";
import API from "../../services/api";

const FoodAnalysis = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalysisHistory();
  }, []);

  const fetchAnalysisHistory = async () => {
    try {
      const response = await API.get("/food-analysis/analysis-history");
      const data = response.data?.data || response.data || [];
      setAnalyses(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analysis history:", error);
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await API.post("/food-analysis/analyze-food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data?.data || response.data;
      navigate(`/user/food-analysis/${data.id || data._id}`);
    } catch (error) {
      console.error("Error uploading food image:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <Box sx={{ px: 4, py: 6, bgcolor: "#0f0f0f", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#00FFCA",
          textShadow: "0 0 10px #00FFCA",
          mb: 4,
        }}
      >
        🔍 AI Food Analysis
      </Typography>

      <Paper
        elevation={5}
        sx={{
          p: 4,
          mb: 5,
          bgcolor: "#1e1e1e",
          border: "1px solid #00FFCA",
          borderRadius: 4,
          textAlign: "center",
          color: "#fff",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Upload or Drag & Drop Food Image
        </Typography>

        <label htmlFor="upload-input">
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              px: 3,
              py: 1.5,
              border: `2px dashed ${dragActive ? "#00ffcaaa" : "#00FFCA"}`,
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s",
              backgroundColor: dragActive ? "#00FFCA20" : "transparent",
            }}
          >
            <CloudUpload sx={{ color: "#00FFCA" }} />
            <Typography sx={{ color: "#00FFCA" }}>
              Choose or Drop Image
            </Typography>
          </Box>
        </label>
      </Paper>

      <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
        Previous Analyses
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="rounded" height={150} animation="wave" />
            </Grid>
          ))}
        </Grid>
      ) : analyses.length === 0 ? (
        <Typography color="#888">No food analyses yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {analyses.map((analysis) => (
            <Grid item xs={12} md={6} key={analysis._id}>
              <Card
                sx={{
                  display: "flex",
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  borderRadius: 3,
                  border: "1px solid #2e2e2e",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.015)",
                    borderColor: "#00FFCA",
                    boxShadow: "0 0 10px #00FFCA50",
                  },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" color="#00FFCA" gutterBottom>
                    <Fastfood fontSize="small" sx={{ mr: 1 }} />
                    {analysis.food}
                  </Typography>
                  <Typography variant="body2" color="#ccc">
                    🍽️ Calories: {analysis.calories} kcal
                  </Typography>
                  <Typography variant="body2" color="#ccc">
                    🥩 Protein: {analysis.proteins}g | 🧈 Fats: {analysis.fats}g
                  </Typography>
                  <Typography variant="body2" color="#ccc">
                    🍞 Carbs: {analysis.carbs}g | 🥦 Fiber: {analysis.fiber}g
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FoodAnalysis;
=======
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CloudUpload, Fastfood } from "@mui/icons-material";
import API from "../../services/api";

const FoodAnalysis = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalysisHistory();
  }, []);

  const fetchAnalysisHistory = async () => {
    try {
      const response = await API.get("/food-analysis/analysis-history");
      const data = response.data?.data || response.data || [];
      setAnalyses(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analysis history:", error);
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await API.post("/food-analysis/analyze-food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data?.data || response.data;
      navigate(`/user/food-analysis/${data.id || data._id}`);
    } catch (error) {
      console.error("Error uploading food image:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <Box sx={{ px: 4, py: 6, bgcolor: "#0f0f0f", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#00FFCA",
          textShadow: "0 0 10px #00FFCA",
          mb: 4,
        }}
      >
        🔍 AI Food Analysis
      </Typography>

      <Paper
        elevation={5}
        sx={{
          p: 4,
          mb: 5,
          bgcolor: "#1e1e1e",
          border: "1px solid #00FFCA",
          borderRadius: 4,
          textAlign: "center",
          color: "#fff",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Upload or Drag & Drop Food Image
        </Typography>

        <label htmlFor="upload-input">
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              px: 3,
              py: 1.5,
              border: `2px dashed ${dragActive ? "#00ffcaaa" : "#00FFCA"}`,
              borderRadius: "12px",
              cursor: "pointer",
              transition: "0.3s",
              backgroundColor: dragActive ? "#00FFCA20" : "transparent",
            }}
          >
            <CloudUpload sx={{ color: "#00FFCA" }} />
            <Typography sx={{ color: "#00FFCA" }}>
              Choose or Drop Image
            </Typography>
          </Box>
        </label>
      </Paper>

      <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
        Previous Analyses
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(4)].map((_, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="rounded" height={150} animation="wave" />
            </Grid>
          ))}
        </Grid>
      ) : analyses.length === 0 ? (
        <Typography color="#888">No food analyses yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {analyses.map((analysis) => (
            <Grid item xs={12} md={6} key={analysis._id}>
              <Card
                sx={{
                  display: "flex",
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  borderRadius: 3,
                  border: "1px solid #2e2e2e",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.015)",
                    borderColor: "#00FFCA",
                    boxShadow: "0 0 10px #00FFCA50",
                  },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" color="#00FFCA" gutterBottom>
                    <Fastfood fontSize="small" sx={{ mr: 1 }} />
                    {analysis.food}
                  </Typography>
                  <Typography variant="body2" color="#ccc">
                    🍽️ Calories: {analysis.calories} kcal
                  </Typography>
                  <Typography variant="body2" color="#ccc">
                    🥩 Protein: {analysis.proteins}g | 🧈 Fats: {analysis.fats}g
                  </Typography>
                  <Typography variant="body2" color="#ccc">
                    🍞 Carbs: {analysis.carbs}g | 🥦 Fiber: {analysis.fiber}g
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FoodAnalysis;
>>>>>>> origin/main
