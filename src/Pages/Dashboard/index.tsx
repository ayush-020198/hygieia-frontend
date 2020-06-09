import React from "react";
import useSWR from "swr";

export const Dashboard: React.FC = () => {
  const { data, isValidating, error } = useSWR("/api/ping");

  if ((!data && !error ) || isValidating) return <h1>Loading..</h1>;

  if (error || data.error) return <h1>Some error occurred.</h1>;

  return <h1>{data.message}</h1>;
};

export default Dashboard;
