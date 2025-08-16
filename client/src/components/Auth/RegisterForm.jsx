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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import loginbackground from "../../assets/images/loginbackground.png";
import { inputLabelClasses } from "@mui/material/InputLabel";

const RegisterForm = () => {
  const [role, setRole] = useState("user"); // 'user' or 'dietician'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)),url(${loginbackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: { xs: 1, sm: 2, md: 3 },
        py: 2,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 2 } }}>
        <Card 
          elevation={6} 
          sx={{ 
            borderRadius: 3, 
            background: "transparent",
            mx: { xs: 0, sm: 1 },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <HowToRegIcon
                sx={{
                  fontSize: { xs: 36, sm: 42, md: 48 },
                  color: "#1976d2",
                  mb: 1,
                }}
              />
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight={600} 
                mb={1} 
                color="#fff"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                Register
              </Typography>
              <Typography
                variant="body2"
                color="#fff"
                mb={2}
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" } }}
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
                sx={{ 
                  mb: 2,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#fff",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
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
                sx={{ 
                  mb: 2,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#fff",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
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
                sx={{ 
                  mb: 2,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#fff",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
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
                sx={{ 
                  mb: 1,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.875rem", sm: "1rem" }
                  }
                }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#fff",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              />
              <Box textAlign="right" mb={2}>
                <Link
                  href="#"
                  underline="hover"
                  color="#fff"
                  fontSize={14}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  sx={{ 
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    "&:hover": {
                      color: "#1976d2",
                    },
                  }}
                >
                  Already have an account? Login
                </Link>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={{ xs: 1, sm: 2 }} mb={3}>
                <Button
                  startIcon={<PersonIcon />}
                  onClick={() => setRole("user")}
                  fullWidth
                  variant={role === "user" ? "contained" : "outlined"}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    py: { xs: 1, sm: 1.5 },
                    backgroundColor: role === "user" ? "#e67e22" : "transparent",
                    color: role === "user" ? "white" : "#fff",
                    borderColor: "#e67e22",
                    "&:hover": {
                      backgroundColor: role === "user" ? "#d35400" : "rgba(230, 126, 34, 0.2)",
                      borderColor: "#d35400",
                    },
                  }}
                >
                  User
                </Button>
                <Button
                  startIcon={<LocalDiningIcon />}
                  onClick={() => setRole("dietician")}
                  fullWidth
                  variant={role === "dietician" ? "contained" : "outlined"}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    py: { xs: 1, sm: 1.5 },
                    backgroundColor: role === "dietician" ? "#e67e22" : "transparent",
                    color: role === "dietician" ? "white" : "#fff",
                    borderColor: "#e67e22",
                    "&:hover": {
                      backgroundColor: role === "dietician" ? "#d35400" : "rgba(230, 126, 34, 0.2)",
                      borderColor: "#d35400",
                    },
                  }}
                >
                  Dietician
                </Button>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size={isMobile ? "medium" : "large"}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  boxShadow: 2,
                  backgroundColor: "#e67e22",
                  "&:hover": {
                    backgroundColor: "#d35400",
                  },
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
