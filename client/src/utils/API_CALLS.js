import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
const token = sessionStorage.getItem("jwttoken");
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

export const userProfile = async ({ id }) => {
  try {
    let config = {
      headers: {
        Authorization: auth_token,
      },
    };

    const { data } = await axios.post(API_BASE_URL + "/about", { id }, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (updateData) => {
  try {
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

export const getInfluencers = async () => {
  const { data } = await axios.get(API_BASE_URL + "/influencers");
  return data;
};

export const sendMessage1 = async (messageData) => {
  try {
    const { data } = await axios.post(API_BASE_URL + "/chat", messageData);
    return data;
  } catch (error) {
    console.timeLog(error);
  }
};

export const getMessages = async (userDetails) => {
  try {
    const { data } = await axios.post(API_BASE_URL + "/getChat", userDetails);
    return data;
  } catch (error) {
    console.log(error);
  }
};
