<<<<<<< HEAD
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
=======
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  { dietician: "Dr. A", rating: 4.5 },
  { dietician: "Dr. B", rating: 3.8 },
  { dietician: "Dr. C", rating: 4.2 },
];

const DieticianRatingsChart = () => {
  return (
    <div className="w-full h-72 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Dietician Ratings</h2>
      <ResponsiveBar
        data={data}
        keys={["rating"]}
        indexBy="dietician"
        layout="horizontal"
        margin={{ top: 20, right: 60, bottom: 50, left: 80 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        colors={{ scheme: "pastel1" }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          legend: "Rating",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{ tickSize: 5, tickPadding: 5 }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
      />
    </div>
  );
};

export default DieticianRatingsChart;
>>>>>>> origin/main
