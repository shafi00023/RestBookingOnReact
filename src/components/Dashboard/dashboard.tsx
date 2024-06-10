import React from "react";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="containers">
        <Sidebar />
        <div className="dashboard">
          <h2>Dashboard</h2>
          <p>Dashboard content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
