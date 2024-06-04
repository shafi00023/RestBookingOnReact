import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
    }
  };
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
          <button onClick={handleSignupRedirect} className="signup-button">
            Don't have an account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
