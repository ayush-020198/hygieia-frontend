import React, { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import { Redirect } from "react-router-dom";
import Loader from "Components/Loader";

type LogoutProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const Logout: React.FC<LogoutProps> = ({ setLoggedIn }) => {
  const { data } = useSWR("/api/logout", {
    onSuccess: () => {
      setLoggedIn(false);
    },
  });
  if (!data) return <Loader />;

  return <Redirect to="/" />;
};

export default Logout;
