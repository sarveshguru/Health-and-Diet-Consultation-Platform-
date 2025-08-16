import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import background from "../../assets/images/background.png";
import Type from "./Type";

const HeroHome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 } }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} direction="column" alignItems="center">
            <Grid item>
              <Typography
                variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
                sx={{ 
                  fontWeight: "bold",
                  fontSize: { 
                    xs: "1.5rem", 
                    sm: "2rem", 
                    md: "2.5rem" 
                  },
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                "Healticians – Where Health Meets Intelligence."
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{ 
                  mt: 1,
                  fontSize: { 
                    xs: "1rem", 
                    sm: "1.25rem", 
                    md: "1.5rem" 
                  },
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                }}
              >
                <Type />
              </Typography>
            </Grid>

            <Grid item>
              <Stack 
                direction={{ xs: "column", sm: "row" }} 
                spacing={{ xs: 1.5, sm: 2 }} 
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                <Button
                  variant="contained"
                  color="success"
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    px: { xs: 3, sm: 4, md: 5 }, 
                    py: { xs: 1, sm: 1.5, md: 2 }, 
                    borderRadius: 3,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    width: { xs: "100%", sm: "auto" }
                  }}
                  onClick={() => (window.location.href = "/register")}
                >
                  Get Started
                </Button>

                <Button
                  variant="contained"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    px: { xs: 3, sm: 4, md: 5 },
                    py: { xs: 1, sm: 1.5, md: 2 },
                    borderRadius: 3,
                    border: 2,
                    borderColor: "#2e7d32",
                    backgroundColor: "rgba(46, 125, 50, 0.2)",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      bgcolor: "#2e7d32",
                    },
                  }}
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroHome;
