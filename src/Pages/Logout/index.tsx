import React, { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import { Redirect } from "react-router-dom";

type LogoutProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const Logout: React.FC<LogoutProps> = ({ setLoggedIn }) => {
  const { data } = useSWR("/api/logout", {
    onSuccess: () => {
      setLoggedIn(false);
    },
  });
  if (!data) return <h1>Logging out...</h1>;

  return <Redirect to="/" />;
};

export default Logout;
