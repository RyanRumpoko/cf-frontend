import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const checkToken = localStorage.getItem("jwtToken");

  if (!checkToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export { AuthRoute };
