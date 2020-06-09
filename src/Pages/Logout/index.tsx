import React from "react";
import useSWR from "swr";
import { Redirect } from "react-router-dom";

export const Logout: React.FC = () => {
  const { data, isValidating, error } = useSWR("/api/logout");
  if ((!data && !error ) || isValidating) return <h1>Logging out...</h1>;

  return <Redirect to="/" />;
};

export default Logout;
