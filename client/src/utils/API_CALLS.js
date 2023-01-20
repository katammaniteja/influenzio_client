import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const userRegister = async (userData) => {
  try {
    const { data } = await axios.post(BASE_URL + "/register", userData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const userLogin = async (loginData) => {
  try {
    const { data } = await axios.post(BASE_URL + "/login", loginData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const userLogout = async () => {
  console.log("hii");
  sessionStorage.removeItem("jwttoken");
  const response = await fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};

export const verifyUser = async () => {
  const response = await fetch("/verifyuser", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};
