import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import API from "../../services/api";

const DieticianProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await API.get("/dietician/me");
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        setProfile(null);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await API.put("/dietician/me", form);
      setProfile(form);
      setEditMode(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
            {profile.name?.[0]}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {profile.name}
          </Typography>
          <Typography color="text.secondary">{profile.email}</Typography>
        </Box>
        {editMode ? (
          <>
            <TextField
              label="Specialty"
              name="specialty"
              value={form.specialty || ""}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Experience (years)"
              name="experience"
              value={form.experience || ""}
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
          </>
        ) : (
          <>
            <Typography sx={{ mb: 1 }}>
              <strong>Specialty:</strong> {profile.specialty || "-"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Experience:</strong> {profile.experience || "-"} years
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <strong>Phone:</strong> {profile.phone || "-"}
            </Typography>
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default DieticianProfile;
