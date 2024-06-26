import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import "./adminDashboard.css";
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

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

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
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Party Size</th>
                      <th>Booking Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.bookingId}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.name}</td>
                        <td>{booking.email}</td>
                        <td>{booking.date}</td>
                        <td>{booking.time}</td>
                        <td>{booking.partySize}</td>
                        <td>{booking.bookingStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default AdminDashboard;
