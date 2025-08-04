import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { getColorForChar } from "../../utils/avatarColors";

const DieticianProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/dietician/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
        setForm(res.data);
        setError(null);
      } catch (err) {
        console.error("Error loading profile:", err?.response || err.message);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3001/api/dietician/me", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(form);
      setEditMode(false);
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5}>
        {error}
      </Typography>
    );
  }

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: " 0 1px 4px rgba(0,0,0,0.89)" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, mb: 2 , bgcolor: getColorForChar(profile?.name?.trim() || "U").charAt(0).toUpperCase() }}>
            {profile?.name?.charAt(0)?.toUpperCase() || "D"}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {profile?.name || "-"}
          </Typography>
          <Typography color="text.secondary">
            {profile?.email || "-"}
          </Typography>
        </Box>

        {editMode ? (
          <>
            <TextField
              label="Specialization"
              name="specialization"
              value={form.specialization || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Experience (years)"
              name="experienceYears"
              value={form.experienceYears || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mb: 1 }}>
              <strong>Specialization:</strong> {profile.specialization || "-"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Experience:</strong> {profile.experienceYears || "-"} years
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Phone:</strong> {profile.phone || "-"}
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() => setEditMode(true)}
                color="primary"
              >
                Edit Profile
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default DieticianProfile;
