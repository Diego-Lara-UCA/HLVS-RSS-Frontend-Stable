import React from "react";
import { Link } from "react-router-dom";

import links from "./index.js";
import "./sidebar.css";

const Sidebar = () => {
  return (
      <aside className="aside">
        <div className="aside__title">
          <h1>HLVS</h1>
        </div>
        <div className="aside__links">
          {links.map((link, index) => (
            <Link key={index} to={`/${link.to}`}>
              {link.name}
            </Link>
          ))}
        </div>
      </aside>
  );
};

export default Sidebar;
