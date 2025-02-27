import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Authentication State
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      toast.error("Authentication error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
        localStorage.setItem("userData", JSON.stringify(data.userData));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("User Data Error:", error);
      toast.error("Failed to fetch user data");
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`);
      setIsLoggedin(false);
      setUserData(null);
      localStorage.removeItem("userData");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed");
    }
  };

  // Check Auth State on Component Mount
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsLoggedin(true);
      setLoading(false);
    } else {
      getAuthState();
    }
  }, [backendUrl]);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AppContent.Provider>
  );
};
