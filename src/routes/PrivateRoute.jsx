import React from "react";
import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { state } = useAppContext();
  if (state.user) {
    return children;
  }
  return <Navigate to={"/signup"} />;
};

export default PrivateRoute;
