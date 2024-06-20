import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Dashboard from "./components/Dashboard/dashboard";
import BookTable from "./components/BookTable/booktable";
import AdminLogin from "./components/AdminLogin/adminLogin";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booktable" element={<BookTable />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
