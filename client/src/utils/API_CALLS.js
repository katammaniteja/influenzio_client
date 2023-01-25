import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
const token = localStorage.getItem("jwttoken");
const auth_token = token ? `Token ${token}` : "";

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

export const userProfile = async () => {
  try {
    let config = {
      headers: {
        Authorization: auth_token,
      },
    };

    const { data } = await axios.get(API_BASE_URL + "/about", config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (updateData) => {
  try {
    console.log(updateData);
    let config = {
      headers: {
        Authorization: auth_token,
      },
    };
    const { data } = await axios.put(
      API_BASE_URL + "/about",
      updateData,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
