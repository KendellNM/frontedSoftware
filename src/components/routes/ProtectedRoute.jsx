import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export const PublicOnlyRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
