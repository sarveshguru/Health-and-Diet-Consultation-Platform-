<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getBMIHistory } from "../../services/api";
import { Box, Typography, CircularProgress } from "@mui/material";

const BMIProgressChart = ({ latestBMI }) => {
  const [bmiData, setBmiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBMI() {
      setLoading(true);
      try {
        const records = await getBMIHistory();
        // Sort by date for correct order
        const sorted = records.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        let data = sorted
          .map((rec) => {
            if (!rec.date) return null;
            const isoDate = new Date(rec.date).toISOString().split("T")[0];
            return {
              x: isoDate,
              y: Number(rec.bmi),
            };
          })
          .filter((point) => point && point.x && !isNaN(new Date(point.x)));
        // Add latest BMI if not present and it's a valid number
        if (
          latestBMI &&
          !isNaN(Number(latestBMI)) &&
          (data.length === 0 ||
            (data[data.length - 1] &&
              data[data.length - 1].y !== Number(latestBMI)))
        ) {
          const today = new Date().toISOString().split("T")[0];
          data.push({
            x: today,
            y: Number(latestBMI),
          });
        }
        setBmiData(
          data.filter(
            (point) =>
              point &&
              typeof point.y === "number" &&
              !isNaN(point.y) &&
              point.x &&
              !isNaN(new Date(point.x)),
          ),
        );
      } catch (err) {
        setBmiData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBMI();
  }, [latestBMI]);

  return (
    <Box
      sx={{
        width: "95%", 
        height: "90%", 
        background: "white",
        borderRadius: 3,
        p: { xs: 1, sm: 2, md: 3 },
        boxShadow: "0 1px 4px rgba(0,0,0,0.89)",
        mt:3,
        mb:3,
        overflow: "hidden", 
        display: "flex",
        flexDirection: "column", 
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="bold">
        BMI Progress
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={220}
        >
          <CircularProgress />
        </Box>
      ) : bmiData.length === 0 ? (
        <Typography color="text.secondary" align="center" mt={4}>
          No BMI data available.
        </Typography>
      ) : (
        <Box sx={{ height: 220 }}>
          <ResponsiveLine
            data={[
              {
                id: "BMI",
                data: bmiData,
              },
            ]}
            margin={{ top: 20, right: 40, bottom: 50, left: 70 }}
            xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisBottom={{
              format: "%b %d",
              tickValues: "every 1 week",
              legend: "Date",
              legendOffset: 40,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: -0,
              tickPadding: -10,
              tickRotation: 0,
              legend: "BMI",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            colors={["#000000"]}
            pointSize={12}
            pointColor="#fff"
            pointBorderWidth={3}
            pointBorderColor="#22c55e"
            enableArea={true}
            areaOpacity={0.08}
            enableGridX={false}
            enableGridY={true}
            useMesh={true}
            enableSlices="x"
            theme={{
              axis: {
                ticks: {
                  text: { fontSize: 13, fill: "#000000" },
                },
                legend: {
                  text: { fontSize: 15, fontWeight: "bold" },
                },
              },
              tooltip: {
                container: {
                  background: "#fff",
                  color: "#222",
                  fontSize: 14,
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                },
              },
            }}
            tooltip={({ point }) => (
              <Box p={1}>
                <Typography fontWeight="bold" color="#22c55e">
                  BMI: {point.data.yFormatted}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {point.data.x}
                </Typography>
              </Box>
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default BMIProgressChart;
=======
import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getBMIHistory } from "../../services/api";
import { Box, Typography, CircularProgress } from "@mui/material";

const BMIProgressChart = ({ latestBMI }) => {
  const [bmiData, setBmiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBMI() {
      setLoading(true);
      try {
        const records = await getBMIHistory();
        // Sort by date for correct order
        const sorted = records.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        let data = sorted
          .map((rec) => {
            if (!rec.date) return null;
            const isoDate = new Date(rec.date).toISOString().split("T")[0];
            return {
              x: isoDate,
              y: Number(rec.bmi),
            };
          })
          .filter((point) => point && point.x && !isNaN(new Date(point.x)));
        // Add latest BMI if not present and it's a valid number
        if (
          latestBMI &&
          !isNaN(Number(latestBMI)) &&
          (data.length === 0 ||
            (data[data.length - 1] &&
              data[data.length - 1].y !== Number(latestBMI)))
        ) {
          const today = new Date().toISOString().split("T")[0];
          data.push({
            x: today,
            y: Number(latestBMI),
          });
        }
        setBmiData(
          data.filter(
            (point) =>
              point &&
              typeof point.y === "number" &&
              !isNaN(point.y) &&
              point.x &&
              !isNaN(new Date(point.x)),
          ),
        );
      } catch (err) {
        setBmiData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBMI();
  }, [latestBMI]);

  return (
    <Box
      sx={{
        width: "100%",
        height: 320,
        background: "hsla(0, 0.00%, 0.00%, 0.07)",
        borderRadius: 3,
        p: 3,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        mt: 3,
        mb: 3,
      }}
    >
      <Typography variant="h6" mb={2} fontWeight="bold">
        BMI Progress
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={220}
        >
          <CircularProgress />
        </Box>
      ) : bmiData.length === 0 ? (
        <Typography color="text.secondary" align="center" mt={4}>
          No BMI data available.
        </Typography>
      ) : (
        <Box sx={{ height: 220 }}>
          <ResponsiveLine
            data={[
              {
                id: "BMI",
                data: bmiData,
              },
            ]}
            margin={{ top: 20, right: 40, bottom: 50, left: 70 }}
            xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            axisBottom={{
              format: "%b %d",
              tickValues: "every 1 week",
              legend: "Date",
              legendOffset: 40,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: -0,
              tickPadding: -10,
              tickRotation: 0,
              legend: "BMI",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            colors={["#22c55e"]}
            pointSize={12}
            pointColor="#fff"
            pointBorderWidth={3}
            pointBorderColor="#22c55e"
            enableArea={true}
            areaOpacity={0.08}
            enableGridX={false}
            enableGridY={true}
            useMesh={true}
            enableSlices="x"
            theme={{
              axis: {
                ticks: {
                  text: { fontSize: 13, fill: "#73768e" },
                },
                legend: {
                  text: { fontSize: 15, fontWeight: "bold" },
                },
              },
              tooltip: {
                container: {
                  background: "#fff",
                  color: "#222",
                  fontSize: 14,
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                },
              },
            }}
            tooltip={({ point }) => (
              <Box p={1}>
                <Typography fontWeight="bold" color="#22c55e">
                  BMI: {point.data.yFormatted}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {point.data.x}
                </Typography>
              </Box>
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default BMIProgressChart;
>>>>>>> origin/main
