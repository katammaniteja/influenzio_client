import React, { useState } from "react";
import "./register.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../../utils/API_CALLS";
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

    const data = await createUser(userData);
    if (data.message) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div className="p-4 background-radial-gradient overflow-hidden container-fluid">
      <div className="row">
        <div className="position-relative m-auto col-md-6">
          <div className="bg-glass card">
            <div className="p-5 card-body" padding="0px">
              <div className="text-center mb-3">
                <h1>Create New Account</h1>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="name"
                  class="form-control"
                  id="name"
                  onChange={handleInput}
                  value={userData.name}
                  name="name"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  onChange={handleInput}
                  value={userData.email}
                  name="email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  onChange={handleInput}
                  value={userData.password}
                  name="password"
                />
              </div>
              <div class="mb-3">
                <label for="cpassword" class="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="cpassword"
                  onChange={handleInput}
                  value={userData.cpassword}
                  name="cpassword"
                />
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
