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
import { toast } from "react-toastify";
import { userLogin } from "../../utils/API_CALLS";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";

function App() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
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

    const data = await userLogin(userData);
    if (data.jwttoken) {
      // dispatch(login);
      sessionStorage.setItem("jwttoken", data.jwttoken);
      toast.success("Login Successful");
    } else {
      toast.error(data.error);
    }
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
                  wrapperClass="mb-1"
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInput}
                  name="password"
                  value={userData.password}
                />
                <div className="form-check mb-3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={(e) => setShowPassword(!showPassword)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Show Password
                  </label>
                </div>
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
    </>
  );
}

export default App;
