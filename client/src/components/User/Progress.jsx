import React, { useEffect, useState } from "react";
import BMICard from "./BMICard";
import BMIProgressChart from "./BMIProgressChart";
import GoalProgressCard from "./GoalProgressCard";
import API from "../../services/api";

const Progress = () => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserDetails = async () => {
    try {
      const res = await API.get("/user-details");
      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Use latest value for BMI calculation
  let bmi = null;
  const getLatest = (arr) =>
    Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : null;
  if (
    Array.isArray(userDetails?.weight) &&
    Array.isArray(userDetails?.height) &&
    userDetails.weight.length &&
    userDetails.height.length
  ) {
    const heightM = getLatest(userDetails.height) / 100;
    bmi = (getLatest(userDetails.weight) / (heightM * heightM)).toFixed(2);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
        Your Progress
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
        }}
      >
        <BMICard userDetails={userDetails} />
        <GoalProgressCard latestBMI={bmi} />
        {/* Future: Add Water Intake Progress Card */}
        {/* Future: Add Sleep Tracking Card */}
        {/* Future: Add Exercise/Activity Progress Card */}
        {/* Future: Add Nutrition/Macronutrient Progress Card */}
        {/* Future: Add Streaks/Consistency Tracker */}
      </div>
      <div style={{ marginTop: "2.5rem" }}>
        <BMIProgressChart />
        {/* Future: Add Combined Progress Line Chart (weight, calories, etc.) */}
        {/* Future: Add Achievements/Badges Section */}
        {/* Future: Add Personalized Recommendations Section */}
      </div>
    </div>
  );
};

export default Progress;
