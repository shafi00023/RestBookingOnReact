import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import "./dashboard.css";
import axios from "axios";
type Booking = {
  bookingId: number;
  name: string;
  email: string;
  date: string;
  time: string;
  partySize: string;
  bookingStatus: string;
};

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<Booking[]>(
          "http://localhost:8000/api/getBooking"
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);
  return (
    <div>
      <Header />
      <div className="containers">
        <Sidebar />
        <div className="dashboard">
          {bookings.length > 0 ? (
            <div>
              <h2>Booking Details</h2>
              <div className="show-booking">
                {bookings.map((booking) => (
                  <div key={booking.bookingId} className="booking">
                    <p>Booking ID: {booking.bookingId}</p>
                    <p>Name: {booking.name}</p>
                    <p>Email: {booking.email}</p>
                    <p>Date: {booking.date}</p>
                    <p>Time: {booking.time}</p>
                    <p>Party Size: {booking.partySize}</p>
                    <p>Booking Status: {booking.bookingStatus}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No booking details available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
