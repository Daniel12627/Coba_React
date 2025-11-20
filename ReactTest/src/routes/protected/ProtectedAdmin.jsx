// src/routes/protected/ProtectedAdmin.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  try {
    const role = localStorage.getItem("role");
    if (role !== "admin") return <Navigate to="/admin/login" replace />;
    return children;
  } catch {
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedAdmin;
