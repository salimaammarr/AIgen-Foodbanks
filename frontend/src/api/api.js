import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL; // Ensure this matches your backend port

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/api/users/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/api/users/login`, userData);
};

export const getFoodItems = () => {
  return axios.get(`${API_URL}/api/food`);
};

export const addFoodItem = (foodData) => {
  return axios.post(`${API_URL}/api/food`, foodData);
};
