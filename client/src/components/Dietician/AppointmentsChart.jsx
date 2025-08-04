<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, CircularProgress } from "@mui/material";

const AppointmentsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get the logged-in dietician's ID
        // const profileRes = await API.get("/dietician/me");
        // const dieticianId = profileRes.data._id;
        const profileRes = await API.get("/dietician/me");
const dieticianId = profileRes.data?._id;

if (!dieticianId) {
  console.error("Dietician ID is undefined. Check login/auth.");
  return;
}


        // Fetch the appointments summary for this dietician
        const res = await API.get(`/appointments/summary/${dieticianId}`);
        const formatted = Array.isArray(res.data)
          ? res.data.map((item) => ({
              date: new Date(item._id || item.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              }),
              appointments: item.count ?? item.appointments ?? 0,
            }))
          : [];
        setData(formatted);
      } catch (err) {
        
console.error("Appointments API error:", err?.response?.data || err?.message || err);

        setError("Error loading appointments");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Appointments Overview
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : data.length === 0 ? (
        <Typography>No appointment data available.</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="appointments" fill="#4caf50" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default AppointmentsChart;
=======
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2024-05-01", appointments: 2 },
  { date: "2024-05-05", appointments: 5 },
  { date: "2024-05-10", appointments: 3 },
  { date: "2024-05-15", appointments: 7 },
  { date: "2024-05-20", appointments: 6 },
];

const AppointmentsChart = () => {
  return (
    <div className="w-full h-72 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Appointments Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="appointments"
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentsChart;
>>>>>>> origin/main
