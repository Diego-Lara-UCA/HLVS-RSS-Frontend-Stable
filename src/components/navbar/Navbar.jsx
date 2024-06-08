import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { NavLink } from "react-router-dom";

const Navbar = ({ toggleMenu }) => {
  return (
    <nav className=" flex w-full items-center justify-between p-4 2xl:pr-10 shadow-md sticky top-0 z-20 bg-white">
      <div>
        <button onClick={toggleMenu}>
          <MenuRoundedIcon fontSize="large" className="text-gray-600" />
        </button>
      </div>
      <div className="flex justify-center items-center">
        <NavLink
          to={`dashboard/profile`}
          className="bg-gray-200 rounded-full w-8 h-8 hover:bg-gray-300"
        ></NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
