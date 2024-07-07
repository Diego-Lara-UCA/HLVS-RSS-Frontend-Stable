import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LogIn from "../pages/login/LogIn";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import LogsEntries from "../pages/logofentries/LogOfEntries";
import PermissionsDetails from "../pages/permissionsdetails/PermissionsDetails";
import GenerateKeys from "../pages/generatekeys/GenerateKeys";
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
import ErrorPage from "../pages/errorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import PageTitle from "../components/pageTitle/PageTitle";
import { userRole } from "../components/sidebar/userRole";

const getDefaultRoute = (role) => {
  switch (role) {
    case "admin":
      return "/dashboard/entryhistory";
    case "supervisor":
      return "/dashboard/createpermission";
    case "guard":
      return "/dashboard/pedestrianaccess";
    case "user":
    case "guest":
      return "/dashboard/logofentries";
    default:
      return "/login";
  }
};

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="HLVS | Home" />
            <Home />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="HLVS | Login" />
            <LogIn />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="HLVS | Profile" />
            <Profile />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["admin", "supervisor", "guard", "user", "guest"]}
          />
        }
      >
        <Route path="" element={<Navigate to={getDefaultRoute(userRole)} />} />
        <Route element={<Dashboard />}>
          <Route
            path="logofentries"
            element={
              <>
                <PageTitle title="HLVS | Logs of Entries" />
                <LogsEntries />
              </>
            }
          />
          <Route
            path="permissiondetails"
            element={
              <>
                <PageTitle title="HLVS | Permissions Details" />
                <PermissionsDetails />
              </>
            }
          />
          <Route
            path="generatekeys"
            element={
              <>
                <PageTitle title="HLVS | Generate Keys" /> <GenerateKeys />
              </>
            }
          />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="entryhistory"
              element={
                <>
                  <PageTitle title="HLVS | Entry History" />
                  <EntryHistory />
                </>
              }
            />
            <Route
              path="manageovertime"
              element={
                <>
                  <PageTitle title="HLVS | Manage Overtime" />
                  <ManageOvertime />
                </>
              }
            />
            <Route
              path="addhouse"
              element={
                <>
                  <PageTitle title="HLVS | Add House" />
                  <AddHouse />
                </>
              }
            />
            <Route
              path="managehouses"
              element={
                <>
                  <PageTitle title="HLVS | Manage Houses" />
                  <ManageHouses />
                </>
              }
            />
            <Route
              path="manageguards"
              element={
                <>
                  <PageTitle title="HLVS | Manage Guards" />
                  <ManageGuards />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["supervisor"]} />}>
            <Route
              path="createpermission"
              element={
                <>
                  <PageTitle title="HLVS | Create Permission" />
                  <CreatePermission />
                </>
              }
            />
            <Route
              path="managepermissions"
              element={
                <>
                  <PageTitle title="HLVS | Manage Permissions" />
                  <ManagePermissions />
                </>
              }
            />
            <Route
              path="managemembers"
              element={
                <>
                  <PageTitle title="HLVS | Manage Members" />
                  <ManageMembers />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["guard"]} />}>
            <Route
              path="pedestrianaccess"
              element={
                <>
                  <PageTitle title="HLVS | Pedestrian Access" />
                  <PedestrianAccess />
                </>
              }
            />
            <Route
              path="vehicularaccess"
              element={
                <>
                  <PageTitle title="HLVS | Vehicular Access" />
                  <VehicularAccess />
                </>
              }
            />
            <Route
              path="anonymousaccess"
              element={
                <>
                  <PageTitle title="HLVS | Anonymous Access" />
                  <AnonymousAccess />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["user", "guest"]} />}>
            <Route
              path="requestpermissions"
              element={
                <>
                  <PageTitle title="HLVS | Request Permissions" />
                  <RequestPermissions />
                </>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
