import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import background from "../../assets/images/background.png";

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        scrollSnapAlign: "start",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 1, sm: 2, md: 3 },
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: 4,
            boxShadow: 3,
            color: "white",
            mx: { xs: 0, sm: 1, md: 2 },
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography
              variant={isMobile ? "h5" : isTablet ? "h4" : "h3"}
              fontWeight="bold"
              gutterBottom
              align="center"
              sx={{ 
                mb: 2,
                fontSize: { 
                  xs: "1.5rem", 
                  sm: "2rem", 
                  md: "2.5rem" 
                },
                lineHeight: 1.2,
                wordBreak: "break-word",
              }}
            >
              About Healticians
            </Typography>
            <Divider sx={{ mb: { xs: 2, sm: 3 }, bgcolor: "white" }} />

            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12}>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: "bold", 
                    mb: 1,
                    fontSize: { 
                      xs: "1.1rem", 
                      sm: "1.25rem", 
                      md: "1.5rem" 
                    }
                  }}
                >
                  🌿 What We Do
                </Typography>
                <Typography 
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ 
                    lineHeight: 1.5,
                    fontSize: { 
                      xs: "0.875rem", 
                      sm: "1rem", 
                      md: "1.1rem" 
                    }
                  }}
                >
                  At Healticians, we help you take control of your health with
                  simple tools that fit into your daily life. From personalized
                  diet plans to expert consultations, we make it easy to build
                  healthier habits — without the guesswork.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: "bold", 
                    mb: 1,
                    fontSize: { 
                      xs: "1.1rem", 
                      sm: "1.25rem", 
                      md: "1.5rem" 
                    }
                  }}
                >
                  ⚙️ How It Works
                </Typography>
                <Typography 
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ 
                    lineHeight: 1.5,
                    fontSize: { 
                      xs: "0.875rem", 
                      sm: "1rem", 
                      md: "1.1rem" 
                    }
                  }}
                >
                  Just sign up, tell us a bit about your lifestyle and goals,
                  and you're good to go. We'll help you plan your meals, track
                  your progress, and connect you with certified dieticians when
                  you need that extra push or advice.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  gutterBottom 
                  sx={{ 
                    fontWeight: "bold", 
                    mb: 1,
                    fontSize: { 
                      xs: "1.1rem", 
                      sm: "1.25rem", 
                      md: "1.5rem" 
                    }
                  }}
                >
                  🎯 Why Choose Us
                </Typography>
                <Typography 
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ 
                    lineHeight: 1.5,
                    fontSize: { 
                      xs: "0.875rem", 
                      sm: "1rem", 
                      md: "1.1rem" 
                    }
                  }}
                >
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
