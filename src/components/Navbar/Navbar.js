import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import logo1 from "./../../images/logo1.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light" style={{ height: 55 }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand ms-3" to="/">
          <img src={logo1} alt="" className="title-logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/influencers">
                Influencers
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink
                className="nav-link"
                to={`/about/${sessionStorage.getItem("userid")}`}
              >
                My Profile
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
