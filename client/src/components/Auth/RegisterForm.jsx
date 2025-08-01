import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [role, setRole] = useState("user"); // 'user' or 'dietician'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const endpoint =
        role === "dietician" ? "/dietician/register" : "/user/register";
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const { data } = await API.post(endpoint, payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      if (role === "user") navigate("/user/complete-profile");
      else navigate("/dietician/dashboard");
    } catch (err) {
      alert(err.response.data.message || "Registration failed");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background:
          "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={6} sx={{ borderRadius: 4 }}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <HowToRegIcon
                sx={{
                  fontSize: 48,
                  color: "#1976d2",
                  mb: 1,
                }}
              />
              <Typography
                variant="h5"
                fontWeight={600}
                mb={1}
                color="primary"
              >
                Register
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
              >
                Create your account to get started.
              </Typography>
            </Box>
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Box textAlign="right" mb={2}>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  fontSize={14}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Already have an account? Login
                </Link>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={2} mb={3}>
                <Button
                  startIcon={<PersonIcon />}
                  variant={role === "user" ? "contained" : "outlined"}
                  color={role === "user" ? "primary" : "inherit"}
                  onClick={() => setRole("user")}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  User
                </Button>
                <Button
                  startIcon={<LocalDiningIcon />}
                  variant={role === "dietician" ? "contained" : "outlined"}
                  color={role === "dietician" ? "primary" : "inherit"}
                  onClick={() => setRole("dietician")}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Dietician
                </Button>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: 18,
                  boxShadow: 2,
                }}
              >
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterForm;
