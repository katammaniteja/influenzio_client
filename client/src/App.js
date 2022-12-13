import React from "react";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Logout from "./components/Logout/Logout";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<Navigate to="/" replace />} path="*" />
      </Routes>
    </>
  );
};

export default App;
