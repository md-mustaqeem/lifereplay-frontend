import { Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "../pages/UserDashboard";
import MyDashboard from "../pages/MyDashboard";
import AddMemory from "../pages/AddMemory";
import MemoryList from "../pages/MemoryList";

import Features from "../pages/Features";
import HowItWorks from "../pages/HowItWorks";
import Testimonials from "../pages/Testimonials";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* 🏠 HOME → USER DASHBOARD */}
      <Route path="/" element={<UserDashboard />} />

      {/* 🌐 PUBLIC */}
      <Route path="/features" element={<Features />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/testimonials" element={<Testimonials />} />

      {/* 🔐 AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* 👤 USER (PRIVATE SCREENS) */}
      <Route
        path="/mydashboard"
        element={token ? <MyDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/add-memory"
        element={token ? <AddMemory /> : <Navigate to="/login" />}
      />
      <Route
        path="/memories"
        element={token ? <MemoryList /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
