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
import ManageOvertime from "../pages/manageovertime/ManageOvertime";
import ManageHouses from "../pages/managehouses/ManageHouses";
import ManageGuards from "../pages/manageguards/ManageGuards";
import PedestrianAccess from "../pages/pedestrianaccess/PedestrianAccess";
import VehicularAccess from "../pages/vehicularaccess/VehicularAccess";
import AnonymousAccess from "../pages/anonymousaccess/AnonymousAccess";
import CreatePermission from "../pages/createpermission/CreatePermission";
import RequestPermissions from "../pages/requestpermissions/RequestPermissions";
import ManagePermissions from "../pages/managepermissions/ManagePermissions";
import ManageMembers from "../pages/managemembers/ManageMembers";
import AddHouse from "../pages/addhouse/AddHouse";

const AppRouter = () => {
  const getInitialRoute = (userRole) => {
    switch (userRole) {
      case "admin":
        return "entryhistory";
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
          <Route path="manageovertime" element={<ManageOvertime />} />
          <Route path="addhouse" element={<AddHouse />} />
          <Route path="managehouses" element={<ManageHouses />} />
          <Route path="manageguards" element={<ManageGuards />} />
          <Route path="pedestrianaccess" element={<PedestrianAccess />} />
          <Route path="vehicularaccess" element={<VehicularAccess />} />
          <Route path="anonymousaccess" element={<AnonymousAccess />} />
          <Route path="createpermission" element={<CreatePermission />} />
          <Route path="requestpermissions" element={<RequestPermissions />} />
          <Route path="managepermissions" element={<ManagePermissions />} />
          <Route path="managemembers" element={<ManageMembers  />} />
          <Route path="dashboard/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
