// src/routes/protected/ProtectedUser.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {
  try {
    const role = localStorage.getItem("role");
    if (role !== "pelanggan") return <Navigate to="/login" replace />;
    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedUser;
