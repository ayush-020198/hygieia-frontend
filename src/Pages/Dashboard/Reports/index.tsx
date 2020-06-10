import React, { useState } from "react";
import useSWR from "swr";
import toast from "Utils/toast";
import styles from "./reports.module.css";
import Button from "Components/Button";
import { ReactComponent as EyeIco } from "Assets/eye.svg";
// import { ReactComponent as Spinner } from "Assets/three-dots.svg";
import { getFile, decryptFile, downloadBlob } from "Utils/ipfs";
import Upload from "./upload";
import Loader from "Components/Loader";
import AskPassphrase from "Components/AskPassphrase";

type Rep = {
  _id: string;
  cid: string;
  title: string;
  name: string;
  mime: string;
};
type Res = {
  error: string;
  reports: Rep[];
};

export type ReportsProps = {
  privKey: string;
  passphrase?: string;
  setPassphrase: React.Dispatch<React.SetStateAction<string | undefined>>;
};

type ReportProps = {
  rep: Rep;
  privKey: string;
  passphrase: string;
};

const Report: React.FC<ReportProps> = ({ rep, privKey, passphrase }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);

  const showFile = (cid: string, name: string, mime: string) => {
    if (isFetching) {
      toast.info("Please wait while the previous download finishes");
      return;
    }
    setIsFetching(true);
    toast.loading("Fetching your Report");
    getFile(cid)
      .then((buf) => {
        console.log(buf.toString());
        setIsFetching(false);
        setIsDecrypting(true);
        toast.info("Decrypting your file");
        return decryptFile(buf, privKey, passphrase);
      })
      .then((val) => downloadBlob(val, name, mime))
      .catch((err) => {
        setIsDecrypting(false);
        setIsFetching(false);
        console.error(err);
        toast.error(err.toString());
      });
  };

  const { name, title, cid, mime } = rep;

  return (
    <Button
      type="button"
      className={styles.li}
      onClick={() => showFile(cid, name, mime)}
      disabled={isFetching || isDecrypting}
    >
      {title.length > 35 ? title.substring(0, 35) + "..." : title}
      <EyeIco className={styles.ico} />
    </Button>
  );
};

export const Reports: React.FC<ReportsProps> = ({
  passphrase,
  setPassphrase,
  privKey,
}) => {
  const { data, error } = useSWR<Res, any>("/api/reports");

  if (error || data?.error)
    return (
      <div className={styles.dash}>
        <h1>Some error occurred.</h1>
      </div>
    );

  if (!data) return <Loader relative />;

  if (!passphrase) return <AskPassphrase setPassphrase={setPassphrase} />;

  return (
    <div className={styles.main}>
      <div>
        <h2>Health Documents</h2>
        <div className={styles.ul}>
          {data?.reports.map((r) => (
            <Report key={r._id} rep={r} privKey={privKey} passphrase={passphrase} />
          ))}
        </div>
      </div>

      <Upload />
    </div>
  );
};

export default Reports;
