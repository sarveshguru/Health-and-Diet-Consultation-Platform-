import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import background from "../../assets/images/background.png";

const FoodAnalyzer = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleButtonClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <Box
      sx={{
        scrollSnapAlign: "start",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        px: { xs: 1, sm: 2, md: 3 },
        py: 2,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 2 } }}>
        <Typography
          variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
          sx={{
            fontWeight: "bold",
            mb: 1.5,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            fontSize: { 
              xs: "1.5rem", 
              sm: "2rem", 
              md: "2.5rem" 
            },
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          Know What's on Your Plate
        </Typography>
        
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{
            mb: 3,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
            fontSize: { 
              xs: "1rem", 
              sm: "1.25rem", 
              md: "1.5rem" 
            },
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          Click. Count. Control.
        </Typography>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Button
          variant="contained"
          size={isMobile ? "small" : "medium"}
          sx={{
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#333",
            fontWeight: "bold",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
          onClick={handleButtonClick}
        >
          Try it Now
        </Button>
      </Container>
    </Box>
  );
};

export default FoodAnalyzer;
