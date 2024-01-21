import React, { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading || isLoading === undefined) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (    
      <Navigate to="/auth" />
    )
  }

  return <Outlet />
}
export default ProtectedRoute;