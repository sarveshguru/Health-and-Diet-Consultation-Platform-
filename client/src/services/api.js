import axios from "axios";

// Base Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Attach JWT token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Book Appointment
export const bookAppointment = async (appointmentData) => {
  const response = await API.post("/appointments/book", appointmentData);
  return response.data;
};

export const getUserAppointments = async () => {
  const response = await API.get("/appointments/user");
  return response.data;
};

export const getDieticianAppointments = async () => {
  const response = await API.get("/appointments/dietician");
  return response.data;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await API.put(`/appointments/status/${appointmentId}`, {
    status,
  });
  return response.data;
};

export const addNotesAndPlan = async (appointmentId, notes, plan) => {
  const response = await API.put(`/appointments/notes/${appointmentId}`, {
    notes,
    plan,
  });
  return response.data;
};

export const addBMIRecord = async (bmi) => {
  const response = await API.post("/bmi-history", { bmi });
  return response.data;
};

export const getBMIHistory = async () => {
  const response = await API.get("/bmi-history");
  return response.data;
};

export const updateUserDetailField = async (field, value) => {
  // Always send as array for number fields
  return API.post("/user-details", {
    [field]: [Number(value)],
  });
};

export const getUserDetailsById = async (userId) => {
  const response = await API.get(`/user/details/${userId}`);
  return response.data;
};

export const getDieticianDetailsById = async (dieticianId) => {
  const response = await API.get(`/dietician/details/${dieticianId}`);
  return response.data;
};

// Get logged-in dietician profile
export const getDieticianProfile = async () => {
  const response = await API.get("/dietician/me");
  return response.data;
};

export default API;
