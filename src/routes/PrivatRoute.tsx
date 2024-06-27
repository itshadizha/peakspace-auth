import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivatRouteProps {
  component: JSX.Element;
  fallbackPath: string;
  isAuth: boolean;
}

const PrivateRoute: React.FC<PrivatRouteProps> = ({ component, fallbackPath, isAuth }) => {
  if (isAuth) {
    return component;
  }

  return <Navigate to={fallbackPath} />;
};

export default PrivateRoute;
