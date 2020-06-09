import React from "react";
import useSWR from "swr";
import styles from "./reports.module.css";
import Button from "Components/Button";
import { ReactComponent as EyeIco } from "Assets/eye.svg";
import { getFile, decryptFile, downloadBlob } from "Utils/ipfs";

type Res = {
  error: string;
  reports: {
    _id: string;
    cid: string;
    title: string;
    name: string;
    mime: string;
  }[];
};

export type ReportsProps = {
  privKey: string;
  passphrase?: string;
  setPassphrase: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const Reports: React.FC<ReportsProps> = ({
  passphrase = "123456",
  setPassphrase,
  privKey,
}) => {
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

  const showFile = (cid: string, name: string, mime: string) => {
    getFile(cid)
      .then((buf) => {
        console.log(buf.toString());
        return decryptFile(buf, privKey, passphrase);
      })
      .then((val) => downloadBlob(val, name, mime))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.main}>
      <div>
        <h2>Health Documents</h2>
        <div className={styles.ul}>
          {data?.reports.map((r) => (
            <Button
              type="button"
              className={styles.li}
              key={r._id}
              onClick={() => showFile(r.cid, r.name, r.mime)}
            >
              {r.title} <EyeIco className={styles.ico} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
