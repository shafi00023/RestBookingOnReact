import React from "react";
import { Route, Routes } from "react-router-dom";
import BookTable from "../BookTable/booktable";

const MainContainer = () => {
  return (
    <main className="main-container">
      <Routes>
        <Route path="/booktable" element={<BookTable />} />
      </Routes>
    </main>
  );
};

export default MainContainer;
