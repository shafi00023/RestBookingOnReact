import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../BookTable/booktable.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/header";
import axios from "axios";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialBookingData = {
    name: "",
    email: "",
    date: "",
    time: "",
    partySize: 1,
    selectedTable: "",
  };

  const [bookingData, setBookingData] = useState(initialBookingData);
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/bookings/${id}`
        );
        const { name, email, date, time, partySize, selectedTable } =
          response.data;
        setBookingData({ name, email, date, time, partySize, selectedTable });
        setSelectedTable(selectedTable);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        toast.error("Failed to load booking data. Please try again.");
      }
    };

    fetchBookingData();
  }, [id]);

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

    const bookingPayload = {
      ...bookingData,
      selectedTable,
    };

    try {
      await axios.put(
        `http://localhost:8000/api/bookings/${id}`,
        bookingPayload
      );
      toast.success("Booking updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating booking:");
      toast.error("Failed to update booking. Please try again.");
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
                  {availableTables.map((table, index) => (
                    <option key={index} value={table}>
                      {table}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit">Update Booking</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditBooking;
