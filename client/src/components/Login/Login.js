import React, { useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../utils/API_CALLS";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const data = await loginUser(userData);
    if (data.jwttoken) {
      dispatch(login);
      localStorage.setItem("jwttoken", data.jwttoken);
      toast.success("Login Successful");
      navigate("/");
    } else {
      toast.error(data.error);
    }
  };

  return (
    <>
      <div className="p-4 gradient-custom-2 overflow-hidden container-fluid">
        <div className="row">
          <div className="position-relative m-auto col-md-6">
            <div className="bg-glass card">
              <div className="p-5 card-body">
                <div className="text-center mb-3">
                  <h1>Login to your Account</h1>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">
                    Email address
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
                    type={!showPassword ? "password" : "text"}
                    class="form-control"
                    id="password"
                    onChange={handleInput}
                    value={userData.password}
                    name="password"
                  />
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
