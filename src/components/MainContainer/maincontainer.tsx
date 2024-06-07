import React from "react";
import "./maincontainer.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/dashboard";
import BookTable from "../BookTable/booktable";

const MainContainer = () => {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booktable" element={<BookTable />} />
      </Routes>
    </main>
  );
};

export default MainContainer;
