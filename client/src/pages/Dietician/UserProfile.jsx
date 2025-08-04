<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";
import HeightIcon from "@mui/icons-material/Height";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FlagIcon from "@mui/icons-material/Flag";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import AlarmIcon from "@mui/icons-material/Alarm";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import HotelIcon from "@mui/icons-material/Hotel";
import OpacityIcon from "@mui/icons-material/Opacity";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import API from "../../services/api";

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await API.get(`/user/details/${userId}`);
        setUser(res.data);
      } catch (err) {
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" mt={5}>
        {error}
      </Typography>
    );
  if (!user) return <Typography mt={5}>User not found.</Typography>;

  return (
    <Box maxWidth={540} mx="auto" mt={6} px={2}>
      <Stack alignItems="center" spacing={2} mb={2}>
        <Avatar
          sx={{ width: 90, height: 90, fontSize: 40, bgcolor: "primary.main" }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" fontWeight="bold" color="primary.dark">
          {user.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EmailIcon fontSize="small" color="action" />
          <Typography color="text.secondary">{user.email}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      {/* Section: Basic Information */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2, mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Basic Information
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CakeIcon color="action" />
            <Typography>
              <strong>Age:</strong> {user.age || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <WcIcon color="action" />
            <Typography>
              <strong>Gender:</strong> {user.gender || "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Section: Physical & Health Details */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2, mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Physical & Health Details
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HeightIcon color="action" />
            <Typography>
              <strong>Height (cm):</strong>{" "}
              {Array.isArray(user.height)
                ? user.height[user.height.length - 1]
                : user.height || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <MonitorWeightIcon color="action" />
            <Typography>
              <strong>Weight (kg):</strong>{" "}
              {Array.isArray(user.weight)
                ? user.weight[user.weight.length - 1]
                : user.weight || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LocalHospitalIcon color="action" />
            <Typography>
              <strong>Medical Conditions:</strong>{" "}
              {user.medicalConditions?.length
                ? user.medicalConditions.join(", ")
                : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <RestaurantMenuIcon color="action" />
            <Typography>
              <strong>Dietary Preferences:</strong>{" "}
              {user.dietaryPreferences?.length
                ? user.dietaryPreferences.join(", ")
                : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <DirectionsRunIcon color="action" />
            <Typography>
              <strong>Activity Level:</strong> {user.activityLevel || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FlagIcon color="action" />
            <Typography>
              <strong>Health Goal:</strong> {user.goal || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <VideoCallIcon color="action" />
            <Typography>
              <strong>Consultation Type:</strong> {user.consultationType || "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Section: Allergies & Health */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2, mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Allergies & Health
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <WarningIcon color="action" />
            <Typography>
              <strong>Has Allergies:</strong> {user.hasAllergies || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <InfoIcon color="action" />
            <Typography>
              <strong>Allergy Details:</strong> {user.allergyDetails || "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Section: Lifestyle & Habits */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Lifestyle & Habits
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <AlarmIcon color="action" />
            <Typography>
              <strong>Wake-up Time:</strong> {user.wakeUpTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FreeBreakfastIcon color="action" />
            <Typography>
              <strong>Breakfast Time:</strong> {user.breakfastTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LunchDiningIcon color="action" />
            <Typography>
              <strong>Lunch Time:</strong> {user.lunchTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <DinnerDiningIcon color="action" />
            <Typography>
              <strong>Dinner Time:</strong> {user.dinnerTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HotelIcon color="action" />
            <Typography>
              <strong>Sleep Duration (hrs):</strong>{" "}
              {Array.isArray(user.sleepDuration)
                ? user.sleepDuration[user.sleepDuration.length - 1]
                : user.sleepDuration || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <OpacityIcon color="action" />
            <Typography>
              <strong>Water Intake (litres/day):</strong>{" "}
              {Array.isArray(user.waterIntake)
                ? user.waterIntake[user.waterIntake.length - 1]
                : user.waterIntake || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FastfoodIcon color="action" />
            <Typography>
              <strong>Snack Habits:</strong> {user.snackHabits || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LocalCafeIcon color="action" />
            <Typography>
              <strong>Caffeine / Tea / Alcohol Consumption:</strong>{" "}
              {user.substanceUse?.length ? user.substanceUse.join(", ") : "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserProfile;
=======
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";
import HeightIcon from "@mui/icons-material/Height";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FlagIcon from "@mui/icons-material/Flag";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import AlarmIcon from "@mui/icons-material/Alarm";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import HotelIcon from "@mui/icons-material/Hotel";
import OpacityIcon from "@mui/icons-material/Opacity";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import API from "../../services/api";

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await API.get(`/user/details/${userId}`);
        setUser(res.data);
      } catch (err) {
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchUser();
  }, [userId]);

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" mt={5}>
        {error}
      </Typography>
    );
  if (!user) return <Typography mt={5}>User not found.</Typography>;

  return (
    <Box maxWidth={540} mx="auto" mt={6} px={2}>
      <Stack alignItems="center" spacing={2} mb={2}>
        <Avatar
          sx={{ width: 90, height: 90, fontSize: 40, bgcolor: "primary.main" }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" fontWeight="bold" color="primary.dark">
          {user.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <EmailIcon fontSize="small" color="action" />
          <Typography color="text.secondary">{user.email}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mb: 3 }} />

      {/* Section: Basic Information */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2, mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Basic Information
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CakeIcon color="action" />
            <Typography>
              <strong>Age:</strong> {user.age || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <WcIcon color="action" />
            <Typography>
              <strong>Gender:</strong> {user.gender || "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Section: Physical & Health Details */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2, mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Physical & Health Details
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HeightIcon color="action" />
            <Typography>
              <strong>Height (cm):</strong>{" "}
              {Array.isArray(user.height)
                ? user.height[user.height.length - 1]
                : user.height || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <MonitorWeightIcon color="action" />
            <Typography>
              <strong>Weight (kg):</strong>{" "}
              {Array.isArray(user.weight)
                ? user.weight[user.weight.length - 1]
                : user.weight || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LocalHospitalIcon color="action" />
            <Typography>
              <strong>Medical Conditions:</strong>{" "}
              {user.medicalConditions?.length
                ? user.medicalConditions.join(", ")
                : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <RestaurantMenuIcon color="action" />
            <Typography>
              <strong>Dietary Preferences:</strong>{" "}
              {user.dietaryPreferences?.length
                ? user.dietaryPreferences.join(", ")
                : "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <DirectionsRunIcon color="action" />
            <Typography>
              <strong>Activity Level:</strong> {user.activityLevel || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FlagIcon color="action" />
            <Typography>
              <strong>Health Goal:</strong> {user.goal || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <VideoCallIcon color="action" />
            <Typography>
              <strong>Consultation Type:</strong> {user.consultationType || "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Section: Allergies & Health */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2, mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Allergies & Health
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <WarningIcon color="action" />
            <Typography>
              <strong>Has Allergies:</strong> {user.hasAllergies || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <InfoIcon color="action" />
            <Typography>
              <strong>Allergy Details:</strong> {user.allergyDetails || "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Section: Lifestyle & Habits */}
      <Box sx={{ background: "#f7fafc", borderRadius: 2, p: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary"
        >
          Lifestyle & Habits
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <AlarmIcon color="action" />
            <Typography>
              <strong>Wake-up Time:</strong> {user.wakeUpTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FreeBreakfastIcon color="action" />
            <Typography>
              <strong>Breakfast Time:</strong> {user.breakfastTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LunchDiningIcon color="action" />
            <Typography>
              <strong>Lunch Time:</strong> {user.lunchTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <DinnerDiningIcon color="action" />
            <Typography>
              <strong>Dinner Time:</strong> {user.dinnerTime || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <HotelIcon color="action" />
            <Typography>
              <strong>Sleep Duration (hrs):</strong>{" "}
              {Array.isArray(user.sleepDuration)
                ? user.sleepDuration[user.sleepDuration.length - 1]
                : user.sleepDuration || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <OpacityIcon color="action" />
            <Typography>
              <strong>Water Intake (litres/day):</strong>{" "}
              {Array.isArray(user.waterIntake)
                ? user.waterIntake[user.waterIntake.length - 1]
                : user.waterIntake || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FastfoodIcon color="action" />
            <Typography>
              <strong>Snack Habits:</strong> {user.snackHabits || "-"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <LocalCafeIcon color="action" />
            <Typography>
              <strong>Caffeine / Tea / Alcohol Consumption:</strong>{" "}
              {user.substanceUse?.length ? user.substanceUse.join(", ") : "-"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserProfile;
>>>>>>> origin/main
