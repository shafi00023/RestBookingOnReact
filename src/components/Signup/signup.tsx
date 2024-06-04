import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/login.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contact, setContactNo] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        username,
        email,
        password,
        contact,
      });
      console.log(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign Up</h2>
        <form className="login-form" onSubmit={handleSignup}>
          <div className="login-devision">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="login-devision">
            <label>Contact No:</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Account</button>
          <button onClick={handleLoginRedirect} className="signup-button">
            alredy have account ? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
