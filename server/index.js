const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dieticianRoutes = require("./routes/dieticianRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userDetailsRoute = require("./routes/userDetailsRoutes");
const bmiHistoryRoutes = require("./routes/bmiHistoryRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use("/api/user", userRoutes);
app.use("/api/dietician", dieticianRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/user-details", userDetailsRoute);
app.use("/api/bmi-history", bmiHistoryRoutes);

// Add this for testing server
app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
