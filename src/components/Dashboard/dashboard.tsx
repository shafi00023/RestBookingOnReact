import React from "react";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import MainContainer from "../MainContainer/maincontainer";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="containers">
        <Sidebar />
        <MainContainer />
      </div>
    </div>
  );
};

export default Dashboard;
