import React, { useState } from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Box, Toolbar, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 2,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {isMobile && (
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: theme.palette.primary.main }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
