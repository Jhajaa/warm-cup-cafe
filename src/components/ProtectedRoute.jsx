import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const location = useLocation();

  if (!token) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly) {
    const userData = user ? JSON.parse(user) : null;
    if (!userData || userData.email !== 'admin@coffeeshop.com') {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
