import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const createUser = async (userData) => {
  try {
    const { data } = await axios.post(API_BASE_URL + "/register", userData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (loginData) => {
  try {
    const { data } = await axios.post(API_BASE_URL + "/login", loginData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
