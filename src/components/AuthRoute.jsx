import React, { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from "../context/AuthContext";

const AuthRoute = () => {
  const { user, isLoading } = useContext(UserContext);
  
  if (isLoading || Object.keys(user).length === 0) {
    return <div>Loading...</div>;
  }

  if (Object.keys(user).length === 0) {
    return (    
      <Outlet />
    )
  }

  return <Navigate to="/home" />
}
export default AuthRoute;