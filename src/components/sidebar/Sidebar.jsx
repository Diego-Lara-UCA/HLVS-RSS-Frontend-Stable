// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import links from "./index.js";
import "./sidebar.css";

const Sidebar = ({ isOpen, toggleMenu }) => { 
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  return (
    isOpen && (
      <aside className="aside">
        <div className="text-xl mb-10 p-8 font-semibold uppercase ">
          <h1>HLVS</h1>
        </div>
        <div className="aside__links font-semibold">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={index}
                to={`/${link.to}`}
                className={({ isActive }) => `${isActive ? "active" : ""}`}
                onClick={() => { if (isMobile()) toggleMenu(); }} // Cerrar el menú al hacer clic si el usuario está en un dispositivo móvil
              >
                <Icon size={24} color="black" />
                {link.name}
              </NavLink>
            );
          })}
        </div>
      </aside>
    )
  );
};

export default Sidebar;