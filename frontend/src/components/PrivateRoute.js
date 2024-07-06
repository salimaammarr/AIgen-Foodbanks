import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
