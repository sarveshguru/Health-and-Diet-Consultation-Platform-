const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dieticianRoutes = require("./routes/dieticianRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userDetailsRoute = require("./routes/userDetailsRoutes");
const bmiHistoryRoutes = require("./routes/bmiHistoryRoutes");
const chatRoutes = require("./routes/chatRoutes");
const foodAnalysisRoutes = require("./routes/foodAnalysisRoutes");
const aiDietPlanRoutes = require("./routes/aiDietPlanRoutes");

const http = require("http");
const setupSocket = require("./socket");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({origin: '*'}));
app.use(express.json());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/dietician", dieticianRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/user-details", userDetailsRoute);
app.use("/api/bmi-history", bmiHistoryRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/food-analysis", foodAnalysisRoutes);
app.use("/api/ai-diet-plan", aiDietPlanRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

setupSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
