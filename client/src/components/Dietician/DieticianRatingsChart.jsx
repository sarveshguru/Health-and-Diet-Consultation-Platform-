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
