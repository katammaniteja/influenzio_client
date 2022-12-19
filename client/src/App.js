import React from "react";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Logout from "./components/Logout/Logout";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { userStatus } from "./redux/actions/auth.action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Influencers from "./components/Influencers/Influencers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  dispatch(userStatus);

  return (
    <>
      <Navbar />
      {user ? (
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<Influencers />} path="/influencers" />
          <Route element={<Navigate to="/" replace />} path="*" />
        </Routes>
      ) : (
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Influencers />} path="/influencers" />
          <Route element={<Navigate to="/" replace />} path="*" />
        </Routes>
      )}
      <ToastContainer position="bottom-right" autoClose={1400} />
    </>
  );
};

export default App;
