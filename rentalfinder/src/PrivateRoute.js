//rentalfinder/src/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return user ? <Component {...rest} /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
