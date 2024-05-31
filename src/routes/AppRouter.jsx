import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "../pages/login/LogIn";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import LogsEntries from "../pages/logofentries/LogOfEntries";
import PermissionsDetails from "../pages/permissionsdetails/PermissionsDetails";
import GenerateKeys from "../pages/generatekeys/GenerateKeys";
import { userRole } from "../components/sidebar/userRole";
import Profile from "../pages/profile/Profile";
import EntryHistory from "../pages/entryhistory/EntryHistory";


const AppRouter = () => {
  const getInitialRoute = (userRole) => {
    switch (userRole) {
      case "admin":
        return "logofentries";
      case "superadmin":
        return "superadmin";
      case "user":
        return "logofentries";
      default:
        return "logofentries";
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route
            path=""
            element={<Navigate to={getInitialRoute(userRole)} />}
          />
          <Route path="logofentries" element={<LogsEntries />} />
          <Route path="permissiondetails" element={<PermissionsDetails />} />
          <Route path="generatekeys" element={<GenerateKeys />} />
          <Route path="entryhistory" element={<EntryHistory />} />
          <Route path="dashboard/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
