import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      console.log(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`);
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["x-auth-token"];
        });
    }
  }, []);

  const login = async (username, password) => {
    try {
      console.log(
        `Logging in at: ${process.env.REACT_APP_BACKEND_URL}/api/users/login`
      );
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;
      const userResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/me`
      );
      console.log("User data:", userResponse.data);
      setUser(userResponse.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
