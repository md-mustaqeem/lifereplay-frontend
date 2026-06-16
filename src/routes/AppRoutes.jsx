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

import ProtectedRoute from "./ProtectedRoute"; // ✅ Use karo

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />

      <Route path="/features" element={<Features />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/testimonials" element={<Testimonials />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ✅ ProtectedRoute use karo — token variable nahi */}
      <Route
        path="/mydashboard"
        element={
          <ProtectedRoute>
            <MyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-memory"
        element={
          <ProtectedRoute>
            <AddMemory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/memories"
        element={
          <ProtectedRoute>
            <MemoryList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
