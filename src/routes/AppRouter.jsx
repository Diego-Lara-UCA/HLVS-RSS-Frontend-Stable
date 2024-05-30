import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "../pages/login/LogIn";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import LogsEntries from "../pages/logofentries/LogOfEntries";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Navigate to="logofentries" />} />
          <Route path="logofentries" element={<LogsEntries />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
