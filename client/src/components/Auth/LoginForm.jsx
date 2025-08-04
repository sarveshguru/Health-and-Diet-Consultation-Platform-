<<<<<<< HEAD
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
      }}
    >
      <Container maxWidth="sm">
        <Card elevation={6} sx={{ borderRadius: 4, background: "transparent" }}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <LoginIcon sx={{ fontSize: 48, color: "#1976d2", mb: 1 }} />
              <Typography variant="h4" fontWeight={600} mb={1} color="#fff">
                Log In
              </Typography>
              <Typography
                variant="body2"
                color="#fff"
                mb={0}
                sx={{ fontSize: 20 }}
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
                sx={{ mb: 2, fontSize: 18 }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
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
                sx={{ mb: 1, fontSize: 18 }}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
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
                    navigate("/register");
                  }}
                >
                  Don't have an account? Register
                </Link>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" gap={2} mb={3}>
                <Button
                  startIcon={<PersonIcon />}
                  onClick={() => setRole("user")}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,

                    backgroundColor: role === "user" ? "#e67e22" : "inherit",

                    color: "white",
                  }}
                >
                  User
                </Button>
                <Button
                  startIcon={<LocalDiningIcon />}
                  onClick={() => setRole("dietician")}
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    backgroundColor:
                      role === "dietician" ? "#e67e22	" : "inherit",
                    color: "white",
                  }}
                >
                  Dietician
                </Button>
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  py: 1.5,
                  fontSize: 18,
                  boxShadow: 2,
                  backgroundColor: "#e67e22",
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
=======
import React, { useState, useContext } from "react";
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
import LoginIcon from "@mui/icons-material/Login";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // or 'dietician'
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        role === "dietician" ? "/dietician/login" : "/user/login";
      const { data } = await API.post(endpoint, { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      
      // Set default authorization header
      API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      
      // Fetch user data based on role
      let userData;
      if (role === "user") {
        const response = await API.get("/user/profile");
        userData = response.data;
      } else if (role === "dietician") {
        const response = await API.get("/dietician/profile");
        userData = response.data;
      }
      
      if (userData) {
        login({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: role,
          ...userData
        });
      }
      
      if (role === "user") navigate("/user/dashboard");
      else navigate("/dietician/dashboard");
    } catch (err) {
      console.error("Login error:", err);
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
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
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
              <LoginIcon sx={{ fontSize: 48, color: "#1976d2", mb: 1 }} />
              <Typography variant="h5" fontWeight={600} mb={1} color="primary">
                Login
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Welcome back! Please login to your account.
              </Typography>
            </Box>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                sx={{ mb: 2 }}
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
                    navigate("/register");
                  }}
                >
                  Don't have an account? Register
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
>>>>>>> origin/main
