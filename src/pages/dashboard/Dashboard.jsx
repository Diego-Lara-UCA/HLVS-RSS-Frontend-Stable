import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'animate.css';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full ">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-col w-full">
        <Navbar toggleMenu={toggleMenu} />
        <div className="overflow-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;