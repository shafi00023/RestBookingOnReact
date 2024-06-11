import React, { useState } from "react";
import "./booktable.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import axios from "axios";

const BookTable = () => {
  const initialBookingData = {
    name: "",
    email: "",
    date: "",
    time: "",
    partySize: 1,
  };

  const [bookingData, setBookingData] = useState(initialBookingData);
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookingStatus = "pending";

    const bookingPayload = {
      ...bookingData,
      selectedTable,
      bookingStatus,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/book-table",
        bookingPayload
      );
      console.log("Table booked successfully:", response.data);
      setBookingData(initialBookingData);
      setSelectedTable("");
      setAvailableTables([]);
      toast.success("Table booked successfully!");
    } catch (error) {
      console.error("Error booking table:", error);
    }
  };
  const checkAvailability = () => {
    const tables: string[] = ["Table 1", "Table 2", "Table 3"];
    setAvailableTables(tables);
  };
  return (
    <div>
      <Header />
      <div className="containers">
        <Sidebar />
        <div className="book-table">
          <form className="booking-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bookingData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={bookingData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={bookingData.time}
              onChange={handleChange}
              required
            />

            <label htmlFor="partySize">Number of Guests:</label>
            <input
              type="number"
              id="partySize"
              name="partySize"
              value={bookingData.partySize}
              onChange={handleChange}
              min="1"
              required
            />

            <button type="button" onClick={checkAvailability}>
              Check Available tables
            </button>

            {availableTables.length > 0 && (
              <div>
                <label htmlFor="select-table">
                  Available Tables - Select Your Table
                </label>
                <select
                  id="select-table"
                  name="selectedTable"
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  required
                >
                  {availableTables.map((table: any, index: any) => (
                    <option key={index} value={table}>
                      {table}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit">Book Table</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookTable;
