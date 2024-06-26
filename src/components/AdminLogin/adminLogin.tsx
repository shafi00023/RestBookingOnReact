import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./adminLogin.css";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleAdminLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const staticEmail = "admin@admin.com";
    const staticPassword = "Admin@123";

    if (email === staticEmail && password === staticPassword) {
      alert("Login successful");
      // Redirect to the admin dashboard or home page
      window.location.href = "/adminDashboard"; // Change this URL to your admin dashboard route
    } else {
      alert("Invalid email or password");
    }
  };
  const handleloginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form className="login-form" onSubmit={handleAdminLogin}>
          <div className="login-devision">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-devision">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Admin Login</button>
          <button onClick={handleloginRedirect} className="signup-button">
            Go Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
