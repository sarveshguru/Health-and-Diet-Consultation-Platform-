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
import LoginIcon from "@mui/icons-material/Login";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import loginbackground from "../../assets/images/loginbackground.png";
import { inputLabelClasses } from "@mui/material/InputLabel";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // or 'dietician'
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "dietician" ? "/dietician/login" : "/user/login";
      const { data } = await API.post(endpoint, { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      if (role === "user") navigate("/user/dashboard");
      else navigate("/dietician/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else if (err.message) {
        alert(err.message);
      } else {
        alert("Login failed");
      }
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
              <LoginIcon 
                sx={{ 
                  fontSize: { xs: 36, sm: 42, md: 48 }, 
                  color: "#1976d2", 
                  mb: 1 
                }} 
              />
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight={600} 
                mb={1} 
                color="#fff"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                Log In
              </Typography>
              <Typography
                variant="body2"
                color="#fff"
                mb={2}
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem", md: "1.1rem" } }}
              >
                Welcome back! Please login to your account.
              </Typography>
            </Box>
            <form onSubmit={handleLogin}>
              <TextField
                autoComplete="off"
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/register");
                  }}
                  sx={{ 
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    "&:hover": {
                      color: "#1976d2",
                    },
                  }}
                >
                  Don't have an account? Register
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
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginForm;
