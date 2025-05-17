// components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [tokenExists, setTokenExists] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("token");
        console.log("Token from cookies:", token); // Debug log

        // Check if token exists and is not empty
        const isValidToken = token && token.trim() !== "";
        setTokenExists(isValidToken);

        if (!isValidToken) {
          toast.dismiss();
          toast.warn("Please login to access this page");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setTokenExists(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [location.pathname]); // Re-check when route changes

  if (isChecking) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return tokenExists ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
