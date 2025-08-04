import React from "react";
import { Box, Typography, Button, Container, Grid, Stack } from "@mui/material";
import background from "../../assets/images/background.png";
import Type from "./Type";
//import { useNavigate } from 'react-router-dom';

const HeroHome = () => {
  //const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)),url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
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
        <Container maxWidth="md">
          <Grid container spacing={4} direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                "Healticians – Where Health Meets Intelligence."
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="h5" sx={{ mt: 2 }}>
                <Type />
              </Typography>
            </Grid>

            <Grid item>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ px: 5, py: 1.5, borderRadius: 3 }}
                  onClick={() => (window.location.href = "/register")}
                >
                  Get Started
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 3,
                    border: 3,
                    borderColor: "#2e7d32",
                    backgroundColor: "rgba(46, 125, 50, 0.2)",
                    "&:hover": {
                      bgcolor: "#2e7d32", // Slightly darker green on hover
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
