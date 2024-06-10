import React from "react";
import "./booktable.css";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";

const BookTable = () => {
  return (
    <div>
      <Header />
      <div className="containers">
        <Sidebar />
        <div className="book-table">
          <h2>Book a Table</h2>
          <p>Booking table content goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
