import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import TaskSession from "./pages/TaskSession"; // Task, Session & Status Page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/task-session" element={<TaskSession />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Handle unknown routes */}
      </Routes>
    </div>
  );
};

export default App;
