<<<<<<< HEAD
import React, { useEffect, useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import API from "../../services/api";

const Profile = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: [], // changed to array
    weight: [], // changed to array
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
    sleepDuration: [], // changed to array
    waterIntake: [], // changed to array
    snackHabits: "",
    substanceUse: [],
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

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
  const consultationOptions = [ "Chat", "Phone"];
  const substances = ["Tea", "Coffee", "Alcohol"];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await API.get("/user-details");
        setFormData({ ...formData, ...res.data });
      } catch (err) {
        // If no details, keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    // eslint-disable-next-line
  }, []);

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

  // Helper to get latest value from array or empty string
  const getLatest = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : "";

  // Add new value to array fields
  const handleArrayFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(Array.isArray(prev[field]) ? prev[field] : []), value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        height: formData.height.map(Number),
        weight: formData.weight.map(Number),
        sleepDuration: formData.sleepDuration.map(Number),
        waterIntake: formData.waterIntake.map(Number),
      };
      await API.post("/user-details", payload);
      setSuccess(true);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box maxWidth={600} mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>
        Your Profile
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="gender">Gender</InputLabel>
          <Select labelId="gender" name="gender" value={formData.gender} onChange={handleChange} label="gender">
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
          value={getLatest(formData.height)}
          onChange={(e) => handleArrayFieldChange("height", e.target.value)}
        />
        <TextField
          fullWidth
          label="Weight (kg)"
          name="weight"
          type="number"
          margin="normal"
          value={getLatest(formData.weight)}
          onChange={(e) => handleArrayFieldChange("weight", e.target.value)}
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="activity-label">Activity Level</InputLabel>
          <Select
          labelId="activity-label"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            label="activity-label"
          >
            {activityOptions.map((lvl) => (
              <MenuItem key={lvl} value={lvl}>
                {lvl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="health-label">Health Goal</InputLabel>
          <Select 
          labelId="health-lebal"
          name="goal" value={formData.goal} onChange={handleChange}
          label="health-lebal">
            {goalOptions.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="ConsultationType">Consultation Type</InputLabel>
          <Select
          labelId="consultationType"
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            label="consultationType"
          >
            {consultationOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Health Details */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="do-you-have-food-allergies">Do you have food allergies?</InputLabel>
          <Select
          labelId="do-you-have-food-allergies"
            name="hasAllergies"
            value={formData.hasAllergies}
            onChange={handleChange}
            label="do-you-have-food-allergies"
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
        {/* Lifestyle Habits */}
        <TextField
          fullWidth
          label="Wake-up Time"
          name="wakeUpTime"
          type="time"
          value={formData.wakeUpTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Breakfast Time"
          name="breakfastTime"
          type="time"
          value={formData.breakfastTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Lunch Time"
          name="lunchTime"
          type="time"
          value={formData.lunchTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Dinner Time"
          name="dinnerTime"
          type="time"
          value={formData.dinnerTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Sleep Duration (hrs)"
          name="sleepDuration"
          type="number"
          value={getLatest(formData.sleepDuration)}
          onChange={(e) =>
            handleArrayFieldChange("sleepDuration", e.target.value)
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Water Intake (litres/day)"
          name="waterIntake"
          type="number"
          value={getLatest(formData.waterIntake)}
          onChange={(e) =>
            handleArrayFieldChange("waterIntake", e.target.value)
          }
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
          Save Changes
        </Button>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
=======
import React, { useEffect, useState } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import API from "../../services/api";

const Profile = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: [], // changed to array
    weight: [], // changed to array
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
    sleepDuration: [], // changed to array
    waterIntake: [], // changed to array
    snackHabits: "",
    substanceUse: [],
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

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
  const consultationOptions = ["Video", "Chat", "Phone"];
  const substances = ["Tea", "Coffee", "Alcohol"];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await API.get("/user-details");
        setFormData({ ...formData, ...res.data });
      } catch (err) {
        // If no details, keep defaults
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    // eslint-disable-next-line
  }, []);

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

  // Helper to get latest value from array or empty string
  const getLatest = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : "";

  // Add new value to array fields
  const handleArrayFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(Array.isArray(prev[field]) ? prev[field] : []), value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        height: formData.height.map(Number),
        weight: formData.weight.map(Number),
        sleepDuration: formData.sleepDuration.map(Number),
        waterIntake: formData.waterIntake.map(Number),
      };
      await API.post("/user-details", payload);
      setSuccess(true);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box maxWidth={600} mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>
        Your Profile
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
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
          value={getLatest(formData.height)}
          onChange={(e) => handleArrayFieldChange("height", e.target.value)}
        />
        <TextField
          fullWidth
          label="Weight (kg)"
          name="weight"
          type="number"
          margin="normal"
          value={getLatest(formData.weight)}
          onChange={(e) => handleArrayFieldChange("weight", e.target.value)}
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Activity Level</InputLabel>
          <Select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            {activityOptions.map((lvl) => (
              <MenuItem key={lvl} value={lvl}>
                {lvl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Health Goal</InputLabel>
          <Select name="goal" value={formData.goal} onChange={handleChange}>
            {goalOptions.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Consultation Type</InputLabel>
          <Select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
          >
            {consultationOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Health Details */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Do you have food allergies?</InputLabel>
          <Select
            name="hasAllergies"
            value={formData.hasAllergies}
            onChange={handleChange}
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
        {/* Lifestyle Habits */}
        <TextField
          fullWidth
          label="Wake-up Time"
          name="wakeUpTime"
          type="time"
          value={formData.wakeUpTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Breakfast Time"
          name="breakfastTime"
          type="time"
          value={formData.breakfastTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Lunch Time"
          name="lunchTime"
          type="time"
          value={formData.lunchTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Dinner Time"
          name="dinnerTime"
          type="time"
          value={formData.dinnerTime}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Sleep Duration (hrs)"
          name="sleepDuration"
          type="number"
          value={getLatest(formData.sleepDuration)}
          onChange={(e) =>
            handleArrayFieldChange("sleepDuration", e.target.value)
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Water Intake (litres/day)"
          name="waterIntake"
          type="number"
          value={getLatest(formData.waterIntake)}
          onChange={(e) =>
            handleArrayFieldChange("waterIntake", e.target.value)
          }
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
          Save Changes
        </Button>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
>>>>>>> origin/main
