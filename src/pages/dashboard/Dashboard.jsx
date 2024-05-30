import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
