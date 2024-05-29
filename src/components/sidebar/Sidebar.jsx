import React from "react";
import links from './index.js'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div>
      <aside className="aside">
        <div className="aside__title">
            <h1>HLVS</h1>
        </div>
        <div className="aside__links">
          {links.map((link, index) => (
            <a key={index} href="">
              {link}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
