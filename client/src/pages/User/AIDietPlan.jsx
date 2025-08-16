import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
// import { useNavigate } from "react-router-dom"; // Removed as it's not used
import { Restaurant, Height, MonitorWeight } from "@mui/icons-material";
import API from "../../services/api";

const AIDietPlan = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    dietaryRestrictions: "",
    allergies: "",
    foodPreferences: "",
  });
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDietPlan(null);

    try {
      const response = await API.post("/ai-diet-plan/generate", formData);
      setDietPlan(response.data.data);
    } catch (error) {
      console.error("Error generating diet plan:", error);
      setError(error.response?.data?.message || "Failed to generate diet plan");
    } finally {
      setLoading(false);
    }
  };

  const activityLevels = [
    { value: "sedentary", label: "Sedentary (little to no exercise)" },
    {
      value: "lightly-active",
      label: "Lightly Active (light exercise 1-3 days/week)",
    },
    {
      value: "moderately-active",
      label: "Moderately Active (moderate exercise 3-5 days/week)",
    },
    {
      value: "very-active",
      label: "Very Active (hard exercise 6-7 days/week)",
    },
    {
      value: "extremely-active",
      label: "Extremely Active (very hard exercise & physical job)",
    },
  ];

  const goals = [
    { value: "weight-loss", label: "Weight Loss" },
    { value: "weight-gain", label: "Weight Gain" },
    { value: "maintenance", label: "Maintenance" },
    { value: "muscle-gain", label: "Muscle Gain" },
    { value: "general-health", label: "General Health" },
  ];

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <Box sx={{ px: 1, py: 2, bgcolor: "#0f0f0f", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#00FFCA",
          textShadow: "0 0 10px #00FFCA",
          mb: 3,
          textAlign: "center",
          fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
        }}
      >
        🤖 AI Diet Plan Generator
      </Typography>

      <Grid container spacing={4} sx={{ maxWidth: "1200px", width: "100%" }}>
        <Grid item xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Card
            sx={{
              bgcolor: "#1e1e1e",
              border: "1px solid #00FFCA",
              borderRadius: 4,
              p: 1,
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ color: "#00FFCA", mb: 3 }}>
                Personal Information
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      InputLabelProps={{ style: { color: "#ccc" } }}
                      InputProps={{
                        style: { color: "#fff", borderColor: "#444" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#444" },
                          "&:hover fieldset": { borderColor: "#00FFCA" },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel sx={{ color: "#ccc" }}>Gender</InputLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        sx={{
                          color: "#fff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00FFCA",
                          },
                          "& .MuiSelect-select": {
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                            paddingRight: "24px",
                          },
                        }}
                      >
                        {genders.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Height (cm)"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <Height sx={{ color: "#00FFCA", mr: 1 }} />
                        ),
                        style: { color: "#fff" },
                      }}
                      InputLabelProps={{ style: { color: "#ccc" } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Weight (kg)"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <MonitorWeight sx={{ color: "#00FFCA", mr: 1 }} />
                        ),
                        style: { color: "#fff" },
                      }}
                      InputLabelProps={{ style: { color: "#ccc" } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel sx={{ color: "#ccc" }}>
                        Activity Level
                      </InputLabel>
                      <Select
                        name="activityLevel"
                        value={formData.activityLevel}
                        onChange={handleChange}
                        sx={{
                          color: "#fff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00FFCA",
                          },
                          "& .MuiSelect-select": {
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxWidth: "70vw",
                              "& .MuiMenuItem-root": {
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                padding: "12px 16px",
                                lineHeight: 1.4,
                              },
                            },
                          },
                        }}
                      >
                        {activityLevels.map((option) => (
                          <MenuItem 
                            key={option.value} 
                            value={option.value}
                            sx={{
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                            }}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel sx={{ color: "#ccc" }}>Goal</InputLabel>
                      <Select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        sx={{
                          color: "#fff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#444",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#00FFCA",
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxWidth: "90vw",
                              "& .MuiMenuItem-root": {
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                padding: "12px 16px",
                                lineHeight: 1.4,
                              },
                            },
                          },
                        }}
                      >
                        {goals.map((option) => (
                          <MenuItem 
                            key={option.value} 
                            value={option.value}
                            sx={{
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              overflowWrap: "break-word",
                            }}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dietary Restrictions (e.g., vegetarian, vegan, keto)"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      multiline
                      rows={2}
                      InputLabelProps={{ style: { color: "#ccc" } }}
                      InputProps={{ style: { color: "#fff" } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Allergies"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      multiline
                      rows={2}
                      InputLabelProps={{ style: { color: "#ccc" } }}
                      InputProps={{ style: { color: "#fff" } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Food Preferences"
                      name="foodPreferences"
                      value={formData.foodPreferences}
                      onChange={handleChange}
                      multiline
                      rows={2}
                      InputLabelProps={{ style: { color: "#ccc" } }}
                      InputProps={{ style: { color: "#fff" } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{
                        bgcolor: "#00FFCA",
                        color: "#000",
                        fontWeight: "bold",
                        py: 2,
                        "&:hover": {
                          bgcolor: "#00FFCA",
                          boxShadow: "0 0 15px #00FFCA",
                        },
                        "&:disabled": {
                          bgcolor: "#555",
                          color: "#888",
                        },
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={24} sx={{ mr: 1 }} />
                          Generating Diet Plan...
                        </>
                      ) : (
                        "Generate AI Diet Plan"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {dietPlan && (
            <Card
              sx={{
                bgcolor: "#1e1e1e",
                border: "1px solid #00FFCA",
                borderRadius: 4,
                p: 3,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ color: "#00FFCA", mb: 3 }}>
                  <Restaurant sx={{ mr: 1 }} />
                  Your AI-Generated Diet Plan
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    Daily Calorie Target
                  </Typography>
                  <Chip
                    label={`${dietPlan.dailyCalories} kcal`}
                    sx={{
                      bgcolor: "#00FFCA",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
                    Macronutrient Distribution
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Chip
                        label={`Protein: ${dietPlan.macronutrients.protein}g`}
                        sx={{ bgcolor: "#e16bffff", color: "#fff" }}
                      />
                    </Grid>
                    <Grid item>
                      <Chip
                        label={`Carbs: ${dietPlan.macronutrients.carbs}g`}
                        sx={{ bgcolor: "#694ecdff", color: "#fff" }}
                      />
                    </Grid>
                    <Grid item>
                      <Chip
                        label={`Fats: ${dietPlan.macronutrients.fats}g`}
                        sx={{ bgcolor: "#ffa76dff", color: "#000" }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 2, bgcolor: "#444" }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                    Meal Plan
                  </Typography>
                  {Object.entries(dietPlan.mealPlan).map(([meal, items]) => (
                    <Box key={meal} sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#00FFCA", mb: 1 }}
                      >
                        {meal.charAt(0).toUpperCase() + meal.slice(1)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#ccc" }}>
                        {items.join(", ")}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                    Key Recommendations
                  </Typography>
                  {dietPlan.recommendations.map((rec, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ color: "#ccc", mb: 1 }}
                    >
                      • {rec}
                    </Typography>
                  ))}
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                    Notes
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    {dietPlan.notes}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIDietPlan;
