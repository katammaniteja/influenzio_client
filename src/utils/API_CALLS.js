import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const token = sessionStorage.getItem("jwttoken");
const auth_token = token ? `Token ${token}` : "";
let config = {
  headers: {
    Authorization: auth_token,
  },
};

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
    const { data } = await axios.get(
      API_BASE_URL + "/about",
      { params: { id } },
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (updateData) => {
  try {
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

export const getMessages = async (userDetails) => {
  try {
    const { data } = await axios.post(API_BASE_URL + "/getChat", userDetails);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addWorkExperience = async (workDetails) => {
  try {
    const { data } = await axios.post(
      API_BASE_URL + "/work-experience",
      workDetails,
      config
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkExperience = async ({ id }) => {
  try {
    console.log(id);
    const { data } = await axios.delete(
      API_BASE_URL + "/work-experience",
      config,
      { id }
    );
    return data;
  } catch (error) {}
};
