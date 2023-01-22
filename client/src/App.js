import React from "react";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Logout from "./components/Logout/Logout";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Influencers from "./components/Influencers/Influencers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Influencers />} path="/influencers" />
        {user ? (
          <>
            <Route element={<About />} path="/about" />
            <Route element={<Logout />} path="/logout" />
          </>
        ) : (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </>
        )}
        <Route element={<Navigate to="/" replace />} path="*" />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={1400} />
    </>
  );
};

export default App;
