import React from "react";
import {BrowserRouter as Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import TaskSession from "./pages/TaskSession"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/task-session" element={<TaskSession />} />
        <Route path="*" element={<Navigate to="/login" />} /> 
      </Routes>
    </div>
  );
};

export default App;
