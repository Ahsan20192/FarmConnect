// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated,role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // if (allowedRoles && !allowedRoles.includes(role)) {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default ProtectedRoute;
