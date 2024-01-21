import React from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return (    
      <Navigate to="/auth" />
    )
  }

  return <Outlet />
}
export default ProtectedRoute;