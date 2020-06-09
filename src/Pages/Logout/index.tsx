import React, { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import { Redirect } from "react-router-dom";

type LogoutProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const Logout: React.FC<LogoutProps> = ({ setLoggedIn }) => {
  const { data, isValidating, error } = useSWR("/api/logout");
  if ((!data && !error) || isValidating) return <h1>Logging out...</h1>;

  setLoggedIn(false);

  return <Redirect to="/" />;
};

export default Logout;
