import React, { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getBMIHistory } from "../../services/api";
import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";

const BMIProgressChart = ({ latestBMI }) => {
  const [bmiData, setBmiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    async function fetchBMI() {
      setLoading(true);
      try {
        const records = await getBMIHistory();
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
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        mt: 2,
        mb: 2,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 }, height: "100%" }}>
        <Typography
          variant="h6"
          mb={2}
          fontWeight="bold"
          sx={{ 
            fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
            textAlign: { xs: "center", sm: "left" }
          }}
        >
          BMI Progress
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={isMobile ? 200 : 250}
          >
            <CircularProgress size={isMobile ? 25 : 35} />
          </Box>
        ) : bmiData.length === 0 ? (
          <Typography
            color="text.secondary"
            align="center"
            sx={{ 
              fontSize: { xs: "0.875rem", sm: "1rem" },
              mt: 4
            }}
          >
            No BMI data available.
          </Typography>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: isMobile ? 280 : 350,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <ResponsiveLine
              data={[
                {
                  id: "BMI",
                  data: bmiData,
                },
              ]}
              margin={{
                top: 10,
                right: isMobile ? 5 : 20,
                bottom: isMobile ? 50 : 60,
                left: isMobile ? 45 : 50,
              }}
              xScale={{ 
                type: "time", 
                format: "%Y-%m-%d", 
                precision: "day",
                useUTC: false 
              }}
              yScale={{
                type: "linear",
                min: 15,
                max: 45,
                stacked: false,
                reverse: false,
              }}
              axisBottom={{
                format: isMobile ? "%b %d" : "%b %d, %Y",
                tickValues: isMobile ? 2 : 5,
                tickSize: isMobile ? 2 : 4,
                tickPadding: isMobile ? 2 : 5,
                tickRotation: isMobile ? -45 : 0,
                legend: "",
              }}
              axisLeft={{
                tickSize: isMobile ? 2 : 4,
                tickPadding: isMobile ? 2 : 5,
                tickRotation: 0,
                legend: "",
                tickValues: isMobile ? [20, 25, 30, 35] : [15, 20, 25, 30, 35, 40, 45],
              }}
              colors={["#1976d2"]}
              pointSize={isMobile ? 4 : 6}
              pointColor="#fff"
              pointBorderWidth={isMobile ? 1 : 2}
              pointBorderColor="#1976d2"
              enableArea={true}
              areaOpacity={0.1}
              enableGridX={false}
              enableGridY={true}
              useMesh={true}
              enableSlices="x"
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fontSize: isMobile ? 8 : 11,
                      fill: "#666",
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: "#e0e0e0",
                    strokeWidth: 1,
                  },
                },
                tooltip: {
                  container: {
                    background: "#fff",
                    color: "#222",
                    fontSize: isMobile ? 10 : 13,
                    borderRadius: 4,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    padding: isMobile ? "4px 6px" : "8px 12px",
                  },
                },
              }}
              tooltip={({ point }) => (
                <Box>
                  <Typography
                    fontWeight="bold"
                    color="#1976d2"
                    sx={{ fontSize: isMobile ? "0.7rem" : "0.875rem" }}
                  >
                    BMI: {point.data.yFormatted}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? "0.6rem" : "0.75rem" }}
                  >
                    {new Date(point.data.x).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BMIProgressChart;
