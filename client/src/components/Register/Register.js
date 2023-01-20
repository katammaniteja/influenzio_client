import React, { useState } from "react";
import "./register.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../../utils/API_CALLS";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return regex.test(userData.email);
  };

  const validateInput = () => {
    const { name, email, password, cpassword } = userData;
    if (!name || !email || !password || !cpassword) {
      toast.error("All fields are required");
      return false;
    }
    if (password !== cpassword) {
      toast.error("Passwords are not matched");
      return false;
    }
    if (!emailValidation()) {
      toast.error("Invalid Email");
      return false;
    }
    return true;
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const isValid = validateInput();
    if (!isValid) return;

    const data = await userRegister(userData);
    if (data.message) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error("Email Already Taken");
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol md="6" className="position-relative m-auto">
            <MDBCard className="bg-glass">
              <MDBCardBody className="p-5" padding="0px">
                <div className="text-center mb-3">
                  <h1>Create New Account</h1>
                </div>
                <MDBInput
                  wrapperClass="mb-3"
                  label="Name"
                  name="name"
                  value={userData.name}
                  id="name"
                  type="text"
                  onChange={handleInput}
                />
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
                <MDBInput
                  wrapperClass="mb-3"
                  label="Confirm Password"
                  id="cpassword"
                  type="password"
                  onChange={handleInput}
                  name="cpassword"
                  value={userData.cpassword}
                />
                <div className="mb-3">
                  Already have an account?
                  <NavLink to="/login"> Login</NavLink>
                </div>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
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
    </>
  );
}

export default App;
