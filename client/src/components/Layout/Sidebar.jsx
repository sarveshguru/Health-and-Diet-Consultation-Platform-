import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import TimelineIcon from "@mui/icons-material/Timeline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../services/api";
import Avatar from "@mui/material/Avatar";
import { getColorForChar } from "../../utils/avatarColors";

const drawerWidth = 240;

const userMainMenuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/user/dashboard" },
  { label: "My Appointment", icon: <EventIcon />, path: "/user/appointments" },
  { label: "Progress Tracker", icon: <TimelineIcon />, path: "/user/progress" },
  { label: "AI Food Analysis", icon: <CameraAltIcon />, path: "/user/food-analysis" },
  { label: "Chat", icon: <ChatIcon />, path: "/user/chat" },
];
const userBottomMenuItems = [
  { label: "Profile Settings", icon: <SettingsIcon />, path: "/user/profile" },
];
const dieticianMainMenuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dietician/dashboard" },
  {
    label: "Appointments",
    icon: <EventIcon />,
    path: "/dietician/appointments",
  },
  { label: "Patients", icon: <GroupIcon />, path: "/dietician/patients" },
  { label: "Chat", icon: <ChatIcon />, path: "/dietician/chat" },
];
const dieticianBottomMenuItems = [
  { label: "Profile", icon: <PersonIcon />, path: "/dietician/profile" },
];

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/me"); // Adjust endpoint if needed
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null); // Clear user state in Sidebar
    navigate("/login"); // Use correct login route
  };

  const role = localStorage.getItem("role");
  const mainMenuItems =
    role === "dietician" ? dieticianMainMenuItems : userMainMenuItems;
  const bottomMenuItems =
    role === "dietician" ? dieticianBottomMenuItems : userBottomMenuItems;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Toolbar
          sx={{
            minHeight: 72,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ letterSpacing: 1, mb: 1 }}
          >
            NutriTrack
          </Typography>
        </Toolbar>
        <Divider />
        <Toolbar
          sx={{
            marginTop: 2,
            minHeight: 72,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mt: 1,
              }}
            >
              <Avatar
                sx={{
                  width: 68,
                  height: 68,
                  bgcolor: getColorForChar(user.name.charAt(0).toUpperCase()),
                  color: "white",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold" marginTop={2}>
                {user.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                marginBottom={2}
              >
                {user.email}
              </Typography>
            </Box>
          )}
        </Toolbar>
        <Divider />
        <List sx={{ mt: 2 }}>
          {mainMenuItems.map(({ label, icon, path }) => (
            <ListItem key={label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={path}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  "&.active": {
                    backgroundColor: theme.palette.action.selected,
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "#f5f6fa",
                  },
                  transition: "background 0.2s",
                  py: 1.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 40,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: 16 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Divider />
        <List>
          {bottomMenuItems.map(({ label, icon, path }) => (
            <ListItem key={label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={NavLink}
                to={path}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  "&.active": {
                    backgroundColor: theme.palette.action.selected,
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "#f5f6fa",
                  },
                  transition: "background 0.2s",
                  py: 1.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 40,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: 16 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                mx: 1,
                borderRadius: 2,
                color: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: "#fbe9e7",
                },
                py: 1.2,
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.error.main,
                  minWidth: 40,
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: 16 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
