// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  // Otherwise render the child component
  return children;
};

export default PrivateRoute;
