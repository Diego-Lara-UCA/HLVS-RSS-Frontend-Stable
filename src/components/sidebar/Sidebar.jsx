import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import links from "./index.js";
import "./sidebar.css";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ isOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let email;

  if (token) {
    const decodedToken = jwtDecode(token);
    email = decodedToken.email;
  }

  function postLogOut() {
    axios({
      method: "post",
      url: `https://api.securityhlvs.com/api/auth/logout/${email}`,
    })
      .then((response) => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) => {
        console;
      });
  }

  return (
    isOpen && (
      <aside className="bg-white fixed flex flex-col justify-between top-0 left-0 w-full md:max-w-[30%] lg:max-w-[20%] xl:max-w-[19%] 2xl:max-w-[18%] md:sticky h-screen shadow-lg transition-transform duration-300 ease-in-out z-30">
        <div>
          <div className="text-xl mb-10 p-8 font-semibold uppercase">
            <h1>HLVS</h1>
          </div>
          <div className="flex flex-col font-semibold">
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={index}
                  to={`/${link.to}`}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-gradient-to-tr from-zinc-700 to-zinc-900 text-white"
                        : ""
                    } flex p-4 pl-6 w-[95%] rounded-r-full transition-all duration-100 ease-in gap-4 animation-bounce`
                  }
                  onClick={() => {
                    if (isMobile()) toggleMenu();
                  }}
                >
                  <Icon size={24} />
                  {link.name}
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center p-10">
          <Button
            className="bg-transparent hover:bg-slate-100 uppercase"
            variant="flat"
            onPress={postLogOut}
          >
            Log out
          </Button>
        </div>
      </aside>
    )
  );
};

export default Sidebar;
