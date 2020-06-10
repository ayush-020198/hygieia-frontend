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
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);

  if ((!data && !error) || isValidating) return <Loader relative />;

  if (error || data?.error)
    return (
      <div className={styles.dash}>
        <h1>Some error occurred.</h1>
      </div>
    );

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
              disabled={isFetching || isDecrypting}
            >
              {r.title.length > 35 ? r.title.substring(0, 35) + "..." : r.title}{" "}
              <EyeIco className={styles.ico} />
            </Button>
          ))}
        </div>
      </div>

      <Upload />
    </div>
  );
};

export default Reports;
