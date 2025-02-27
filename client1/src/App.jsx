import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import TaskSession from "./pages/TaskSession";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "./context/AppContent"; // ✅ Import Context Provider
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AppContextProvider>  {/* ✅ Wrap the app inside AppContextProvider */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/task-session" element={<TaskSession />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
