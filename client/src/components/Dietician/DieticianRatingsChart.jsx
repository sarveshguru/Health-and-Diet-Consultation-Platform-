import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";

const DieticianRatingsChart = ({ dieticianId }) => {
  const [ratingData, setRatingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(`/api/ratings/${dieticianId}`);
        const ratings = res.data;

        if (!ratings.length) {
          setRatingData([]);
          return;
        }

        const totalRatings = ratings.length;
        const days = 5;
        const chartData = [];
        let currentCount = 0;
        let cumulativeRating = 0;

        for (let i = 0; i < days; i++) {
          const remaining = totalRatings - currentCount;
          const change =
            i === days - 1
              ? remaining
              : Math.min(1 + Math.floor(Math.random() * 2), remaining);

          const dayRatings = ratings.slice(currentCount, currentCount + change);
          const sum = dayRatings.reduce((acc, r) => acc + (r.rating || 0), 0);

          cumulativeRating += sum;
          currentCount += change;

          chartData.push({
            date: `${i + 1} Aug`,
            rating: parseFloat((cumulativeRating / currentCount).toFixed(2)),
          });
        }

        setRatingData(chartData);
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [dieticianId]);

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
        Ratings Overview
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress size={28} />
        </Box>
      ) : ratingData.length === 0 ? (
        <Typography color="text.secondary">No ratings yet.</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={ratingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} tickCount={6} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#ff9800"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default DieticianRatingsChart;
