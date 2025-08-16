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
  useMediaQuery,
  Avatar,
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
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { getColorForChar } from "../../utils/avatarColors";

const drawerWidth = 240;

const userMainMenuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/user/dashboard" },
  { label: "My Appointment", icon: <EventIcon />, path: "/user/appointments" },
  { label: "Progress Tracker", icon: <TimelineIcon />, path: "/user/progress" },
  {
    label: "AI Food Analysis",
    icon: <CameraAltIcon />,
    path: "/user/food-analysis",
  },
  {
    label: "AI Diet Plan",
    icon: <RestaurantIcon />,
    path: "/user/ai-diet-plan",
  },
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

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentRole = localStorage.getItem("role");
        const endpoint =
          currentRole === "dietician" ? "/dietician/me" : "/user/me";
        const res = await API.get(endpoint);
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
    setUser(null);
    navigate("/login");
  };

  const role = localStorage.getItem("role");
  const mainMenuItems =
    role === "dietician" ? dieticianMainMenuItems : userMainMenuItems;
  const bottomMenuItems =
    role === "dietician" ? dieticianBottomMenuItems : userBottomMenuItems;

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNavigation = () => {
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={isMobile ? handleDrawerToggle : undefined}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 1,
        height: "100vh",
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.89)",
        },
      }}
    >
      <Box>
        <Toolbar
          sx={{
            minHeight: 56,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            sx={{ letterSpacing: 1, mb: 0.5, fontSize: "1.1rem" }}
          >
            Healticians
          </Typography>
        </Toolbar>
        <Divider />
        <Toolbar
          sx={{
            marginTop: 1,
            minHeight: 60,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 1,
          }}
        >
          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mt: 0.5,
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: getColorForChar(
                    user.name.charAt(0).toUpperCase()
                  ),
                  py: "2px",
                  px: "0px",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "24px",
                  width: 56,
                  height: 56,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold" marginTop={1} sx={{ fontSize: "0.9rem" }}>
                {user.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                marginBottom={1}
                sx={{ fontSize: "0.75rem" }}
              >
                {user.email}
              </Typography>
            </Box>
          )}
        </Toolbar>
        <Divider />
        <List sx={{ mt: 1 }}>
          {mainMenuItems.map(({ label, icon, path }) => (
            <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={path}
                onClick={handleNavigation}
                sx={{
                  mx: 0.5,
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
                  py: 0.8,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 36,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: "13px" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Divider />
        <List>
          {bottomMenuItems.map(({ label, icon, path }) => (
            <ListItem key={label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={path}
                onClick={handleNavigation}
                sx={{
                  mx: 0.5,
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
                  py: 0.8,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: 36,
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ fontSize: "13px" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
              sx={{
                mx: 0.5,
                borderRadius: 2,
                color: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: "#fbe9e7",
                },
                py: 0.8,
              }}
            >
              <ListItemIcon
                sx={{
                  color: theme.palette.error.main,
                  minWidth: 36,
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: "13px" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
