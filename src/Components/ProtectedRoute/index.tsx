import React from "react";
import { Redirect, Route, useLocation, RouteProps } from "react-router-dom";

export type ProtectedRouteProps = RouteProps & { isLoggedIn: boolean };
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isLoggedIn,
  children,
  ...rest
}) => {
  const location = useLocation();

  return (
    <Route {...rest}>
      {isLoggedIn ? (
        children
      ) : (
        <Redirect to={{ pathname: "/login", state: { referrer: location.pathname } }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;
