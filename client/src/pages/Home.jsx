import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
