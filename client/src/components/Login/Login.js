import React, { useState } from "react";
import "./login.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../../utils/API_CALLS";

function App() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const validateInput = () => {
    const { email, password } = userData;
    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validateInput();
    if (!isValid) return;

    const response = await userLogin(userData.email, userData.password);

    const data = await response.json();
    if (response.status === 200) {
      toast.success(data.message);
    } else {
      toast.error(data.error);
    }
    console.log(userData);
  };

  return (
    <>
      <MDBContainer fluid className="p-4 gradient-custom-2 overflow-hidden">
        <MDBRow>
          <MDBCol md="6" className="position-relative m-auto">
            <MDBCard className="bg-glass">
              <MDBCardBody className="p-5" padding="0px">
                <div className="text-center mb-3">
                  <h1>Login to your Account</h1>
                </div>
                <MDBInput
                  wrapperClass="mb-3"
                  label="Email"
                  id="email"
                  type="email"
                  onChange={handleInput}
                  value={userData.value}
                  name="email"
                />
                <MDBInput
                  wrapperClass="mb-3"
                  label="Password"
                  id="password"
                  type="password"
                  onChange={handleInput}
                  name="password"
                  value={userData.password}
                />
                <div className="mb-3">
                  Don't have an account?
                  <NavLink to="/register"> Register</NavLink>
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
