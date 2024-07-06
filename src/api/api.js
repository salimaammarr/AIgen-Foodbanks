import axios from "axios";

const API_URL = "http://localhost:4000/api"; // Ensure this matches your backend port

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}/users/login`, userData);
};

export const getFoodItems = () => {
  return axios.get(`${API_URL}/food`);
};

export const addFoodItem = (foodData) => {
  return axios.post(`${API_URL}/food`, foodData);
};
