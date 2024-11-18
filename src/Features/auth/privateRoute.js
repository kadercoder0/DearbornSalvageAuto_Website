import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

const PrivateRoute = ({ children, adminOnly, ...rest }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/admin/managelistings" />;
  }

  return children;
};

export default PrivateRoute;
