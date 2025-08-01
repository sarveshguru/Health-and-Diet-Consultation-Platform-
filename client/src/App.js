import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";

import Home from "./pages/Home";
import UserDashboard from "./pages/User/Dashboard";
import Profile from "./pages/User/Profile";
import CompleteProfile from "./pages/User/CompleteProfile";
import Appointments from "./pages/User/Appointments";
import DieticianDashboard from "./pages/Dietician/Dashboard";
import DieticianProfile from "./pages/Dietician/Profile";
import PatientList from "./pages/Dietician/PatientList";
import ProtectedRoute from "./routes/ProtectedRoute";
import Progress from "./components/User/Progress";
import UserProfile from "./pages/Dietician/UserProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* User routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRole="user">
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="complete-profile" element={<CompleteProfile />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="progress" element={<Progress />} />
            {/* Add more user routes as needed */}
          </Route>

          {/* Dietician routes */}
          <Route
            path="/dietician"
            element={
              <ProtectedRoute allowedRole="dietician">
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DieticianDashboard />} />
            <Route
              path="appointments"
              element={
                <ProtectedRoute allowedRole="dietician">
                  {require("./pages/Dietician/Appointments").default
                    ? require("./pages/Dietician/Appointments").default()
                    : null}
                </ProtectedRoute>
              }
            />
            <Route path="profile" element={<DieticianProfile />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="user-profile" element={<UserProfile />} />
            {/* Add more dietician routes as needed */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
