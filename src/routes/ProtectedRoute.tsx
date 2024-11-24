import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userRole } from "../components/Sidebar/userRole";

const ProtectedRoute = ({ allowedRoles }) => {
  return allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/errorpage" />
  );
};

export default ProtectedRoute;
