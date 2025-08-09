import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    toast.error("Please log in first", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
