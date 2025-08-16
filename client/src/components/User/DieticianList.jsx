import React from "react";
import { Box, Typography, Button, Grid, Card } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import Avatar from "@mui/material/Avatar";
import { getColorForChar } from "../../utils/avatarColors";

const DieticianList = ({ dieticians = [], loading, onBook }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" fontWeight="bold" mb={2}>
      Available Dieticians
    </Typography>
    <Grid container spacing={3}>
      {dieticians.map((d) => (
        <Grid item xs={12} sm={6} md={4} key={d._id}>
          <Card
            sx={{
              p: 2,
              pt: 4,
              pb: 4,
              mb: 4,
              border: "1px solid #e0e0e0",
              borderRadius: 3,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(10,5,5,0.89)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 260,
            }}
          >
            <Avatar
              sx={{
                width: 50,
                height: 50,
                bgcolor: getColorForChar(d.name.charAt(0).toUpperCase()),
                color: "white",
                fontSize: 34,
                fontWeight: "bold",
              }}
            >
              {d.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              fontWeight="bold"
              variant="subtitle1"
              align="center"
              marginTop={2}
            >
              Dr. {d.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              mb={1}
            >
              {d.specialization || "Dietician"}
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={1}
            >
              <StarIcon sx={{ color: "#facc15", fontSize: 20, mr: 0.5 }} />
              <Typography variant="body2" fontWeight="bold" sx={{ mr: 0.5 }}>
                {d.rating ? d.rating.toFixed(1) : "4.8"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({d.reviewsCount || "156"})
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={0.5}>
              <SchoolIcon sx={{ color: "#22c55e", fontSize: 18, mr: 1 }} />
              <Typography variant="body2">
                {d.experienceYears
                  ? `${d.experienceYears} years experience`
                  : "Experience: N/A"}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "#22c55e",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 2,
                mt: 1,
                py: 1.2,
                fontSize: 16,
                "&:hover": { background: "#16a34a" },
              }}
              onClick={() => onBook(d._id)}
            >
              Book Consultation
            </Button>
          </Card>
        </Grid>
      ))}
      {!dieticians.length && !loading && (
        <Grid item xs={12}>
          <Typography color="text.secondary" align="center">
            No dieticians found.
          </Typography>
        </Grid>
      )}
      {loading && (
        <Grid item xs={12}>
          <Typography color="text.secondary" align="center">
            Loading...
          </Typography>
        </Grid>
      )}
    </Grid>
  </Box>
);

export default DieticianList;
