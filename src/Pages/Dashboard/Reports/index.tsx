import React from "react";
import useSWR from "swr";
import styles from "./reports.module.css";
import Button from "Components/Button";
import { ReactComponent as EyeIco } from "Assets/eye.svg";

type Res = {
  error: string;
  reports: {
    _id: string;
    cid: string;
    title: string;
  }[];
};

export const Reports: React.FC = () => {
  const { data, isValidating, error } = useSWR<Res, any>("/api/reports");

  if ((!data && !error) || isValidating)
    return (
      <div className={styles.dash}>
        <h1>Loading..</h1>
      </div>
    );

  if (error || data?.error)
    return (
      <div className={styles.dash}>
        <h1>Some error occurred.</h1>
      </div>
    );

  return (
    <div className={styles.main}>
      <div>
        <h2>Health Documents</h2>
        <div className={styles.ul}>
          {data?.reports.map((r) => (
            <Button type="button" className={styles.li} key={r._id}>
              {r.title} <EyeIco className={styles.ico} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
