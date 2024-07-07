import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["x-auth-token"];
        });
    }
  }, []);

  const login = async (username, password) => {
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
    setUser(userResponse.data);
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
