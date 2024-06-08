// Dashboard.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} /> {/* Pasar toggleMenu a Sidebar */}
      <div className="flex flex-col w-full h-full">
        <Navbar toggleMenu={toggleMenu} />
        <div className="overflow-auto flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;