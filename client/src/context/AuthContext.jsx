import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      
      if (token && role) {
        try {
          // Set default authorization header
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          // Fetch user data based on role
          let userData;
          if (role === "user") {
            const response = await API.get("/user/me");
            userData = response.data;
          } else if (role === "dietician") {
            const response = await API.get("/dietician/me");
            userData = response.data;
          }
          
          if (userData) {
            setUser({
              id: userData._id,
              name: userData.name,
              email: userData.email,
              role: role,
              ...userData
            });
          }
        } catch (error) {
          console.error("Error initializing auth:", error);
          if (error.response && error.response.data) {
            console.error("Server error details:", error.response.data);
          }
          // Clear invalid token
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          delete API.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    delete API.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
