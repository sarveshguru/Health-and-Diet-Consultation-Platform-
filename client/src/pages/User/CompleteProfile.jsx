import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    medicalConditions: [],
    dietaryPreferences: [],
    activityLevel: "",
    goal: "",
    consultationType: "",
    hasAllergies: "",
    allergyDetails: "",
    wakeUpTime: "",
    breakfastTime: "",
    lunchTime: "",
    dinnerTime: "",
    sleepDuration: "",
    waterIntake: "",
    snackHabits: "",
    substanceUse: [],
  });

  const medicalOptions = ["Diabetes", "Hypertension", "Thyroid", "None"];
  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Keto",
    "Low Carb",
    "Gluten-Free",
  ];
  const activityOptions = ["Low", "Moderate", "High"];
  const goalOptions = [
    "Lose Weight",
    "Gain Weight",
    "Maintain Weight",
    "Improve Health",
  ];
  const substances = ["Tea", "Coffee", "Alcohol"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const updated = prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user-details", formData);
      navigate("/user/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <Box maxWidth={600} mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>
        Complete Your Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          margin="normal"
          value={formData.age}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Height (cm)"
          name="height"
          type="number"
          margin="normal"
          value={formData.height}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Weight (kg)"
          name="weight"
          type="number"
          margin="normal"
          value={formData.weight}
          onChange={handleChange}
        />

        <Typography mt={2}>Medical Conditions</Typography>
        <FormGroup row>
          {medicalOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={formData.medicalConditions.includes(option)}
                  onChange={() =>
                    handleCheckboxChange("medicalConditions", option)
                  }
                />
              }
              label={option}
            />
          ))}
        </FormGroup>

        <Typography mt={2}>Dietary Preferences</Typography>
        <FormGroup row>
          {dietaryOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={formData.dietaryPreferences.includes(option)}
                  onChange={() =>
                    handleCheckboxChange("dietaryPreferences", option)
                  }
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="activity-label">Activity Level</InputLabel>
          <Select
            labelId="activity-label"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            label="Acitivity-label"
          >
            {activityOptions.map((lvl) => (
              <MenuItem key={lvl} value={lvl}>
                {lvl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="health-goal">Health Goal</InputLabel>
          <Select
            labelId="health-goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            label="Health Goal"
          >
            {goalOptions.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Health Details */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="Do-you-have-food-allergies">
            Do you have food allergies?
          </InputLabel>
          <Select
            labelId="Do-you-have-food-allergies"
            name="hasAllergies"
            value={formData.hasAllergies}
            onChange={handleChange}
            label="Do-you-have-food-allergies"
          >
            <MenuItem value="no">No</MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="specify">Specify Below</MenuItem>
          </Select>
        </FormControl>
        {formData.hasAllergies === "specify" && (
          <TextField
            fullWidth
            label="Allergy Details"
            name="allergyDetails"
            value={formData.allergyDetails}
            onChange={handleChange}
            margin="normal"
          />
        )}
        <TextField
          fullWidth
          label="Wake up Time"
          name="wakeUpTime"
          type="time"
          value={formData.wakeUpTime}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            sx: {
              "& input": {
                color: formData.wakeUpTime ? "inherit" : "transparent",
                cursor: "pointer",
              },
              "& input:focus": {
                color: "inherit",
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Breakfast Time"
          name="breakfastTime"
          type="time"
          value={formData.breakfastTime}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            sx: {
              "& input": {
                color: formData.breakfastTime ? "inherit" : "transparent",
                cursor: "pointer",
              },
              "& input:focus": {
                color: "inherit",
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Lunch Time"
          name="lunchTime"
          type="time"
          value={formData.lunchTime}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            sx: {
              "& input": {
                color: formData.lunchTime ? "inherit" : "transparent",
                cursor: "pointer",
              },
              "& input:focus": {
                color: "inherit",
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Dinner Time"
          name="dinnerTime"
          type="time"
          value={formData.dinnerTime}
          onChange={handleChange}
          margin="normal"
          InputProps={{
            sx: {
              "& input": {
                color: formData.dinnerTime ? "inherit" : "transparent",
                cursor: "pointer",
              },
              "& input:focus": {
                color: "inherit",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Sleep Duration (hrs)"
          name="sleepDuration"
          type="number"
          value={formData.sleepDuration}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Water Intake (litres/day)"
          name="waterIntake"
          type="number"
          value={formData.waterIntake}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Snack Habits"
          name="snackHabits"
          multiline
          rows={2}
          value={formData.snackHabits}
          onChange={handleChange}
          margin="normal"
        />
        <Typography mt={2}>Caffeine / Tea / Alcohol Consumption</Typography>
        <FormGroup row>
          {substances.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={formData.substanceUse.includes(item)}
                  onChange={() => handleCheckboxChange("substanceUse", item)}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CompleteProfile;
