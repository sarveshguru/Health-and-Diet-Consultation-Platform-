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
