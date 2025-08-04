// src/components/About.jsx
import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import background from "../../assets/images/background.png"; // reuse background image

const About = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        scrollSnapAlign: "start",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        py: 10,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: 4,
            boxShadow: 3,
            color: "white",
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              align="center"
            >
              About Healticians
            </Typography>
            <Divider sx={{ mb: 4, bgcolor: "white" }} />

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  🌿 What We Do
                </Typography>
                <Typography variant="body1">
                  At Healticians, we help you take control of your health with
                  simple tools that fit into your daily life. From personalized
                  diet plans to expert consultations, we make it easy to build
                  healthier habits — without the guesswork.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  ⚙️ How It Works
                </Typography>
                <Typography variant="body1">
                  Just sign up, tell us a bit about your lifestyle and goals,
                  and you're good to go. We'll help you plan your meals, track
                  your progress, and connect you with certified dieticians when
                  you need that extra push or advice.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  🎯 Why Choose Us
                </Typography>
                <Typography variant="body1">
                  Unlike one-size-fits-all apps, Healticians is built around
                  you. Whether you're looking to lose weight, eat better, or
                  manage specific health conditions, we offer practical,
                  real-life guidance with support at every step.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default About;
