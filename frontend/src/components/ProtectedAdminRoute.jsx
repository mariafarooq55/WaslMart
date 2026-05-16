import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Check if user is logged in and has admin role
  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedAdminRoute;
