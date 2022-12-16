import React, { useState } from "react";
import "./Home.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <MDBContainer
      fluid
      className="p-4 background-radial-gradient overflow-hidden"
    >
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h3
            className="my-5 display-3 fw-bold ls-tight px-3"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            <h1>The best we offer</h1>
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              <h3>for your business</h3>
            </span>
          </h3>

          <p
            className="px-3"
            style={{ color: "hsl(218, 81%, 85%)", padding: "0px 0px" }}
          >
            At Shoutcart, we connect you with popular influencers to get your
            brand in front of their audience! 750M+ Follower & Subscriber
            network, simple setup, guaranteed & secure process.
          </p>
        </MDBCol>

        <MDBCol md="6" className="position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div>

          <MDBCard className="my-5 bg-glass">
            <MDBCardBody className="p-5" padding="0px">
              <MDBInput
                wrapperClass="mb-4"
                label="Name"
                name="name"
                value={userData.name}
                id="form2"
                type="text"
                onChange={handleInput}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form5"
                type="email"
                onChange={handleInput}
                value={userData.value}
                name="email"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form6"
                type="password"
                onChange={handleInput}
                name="password"
                value={userData.password}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Confirm Password"
                id="form6"
                type="cpassword"
                onChange={handleInput}
                name="cpassword"
                value={userData.cpassword}
              />
              <div className="mb-3">
                Already have an account?
                <NavLink to="/login"> Login</NavLink>
              </div>

              <div class="d-grid gap-2">
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={handleRegister}
                >
                  Sign Up
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
