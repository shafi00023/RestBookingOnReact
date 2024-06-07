// src/components/Sidebar/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booktable"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Book Table
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
