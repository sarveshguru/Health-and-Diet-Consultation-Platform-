import axios from "axios";

// Base Axios instance for chat
const chatAPI = axios.create({
  baseURL: "http://localhost:3001/api/chat",
});

// Attach JWT token to all requests
chatAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Send a message
export const sendMessage = async (messageData) => {
  const response = await chatAPI.post("/send", messageData);
  return response.data;
};

// Create a new conversation
export const createConversation = async (conversationData) => {
  const response = await chatAPI.post("/create", conversationData);
  return response.data;
};

// Get messages between two users
export const getMessages = async (userId1, userId2) => {
  const response = await chatAPI.get(`/${userId1}/${userId2}`);
  return response.data;
};

// Get chat list for a user
export const getChatList = async (userId) => {
  const response = await chatAPI.get(`/list/${userId}`);
  return response.data;
};

export default chatAPI;
