import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { key } from "openpgp";
import toast from "Utils/toast";
import styles from "./reports.module.css";
import Button from "Components/Button";
import { ReactComponent as EyeIco } from "Assets/eye.svg";
import { ReactComponent as Spinner } from "Assets/three-dots.svg";
import { getFile, decryptFile, downloadBlob, unlockKey } from "Utils/ipfs";
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
  unlockedKey?: key.Key;
  setUnlockedKey: React.Dispatch<React.SetStateAction<key.Key | undefined>>;
};

type ReportProps = {
  rep: Rep;
  privKey: string;
  passphrase: string;
  unlockedKey?: key.Key;
};

const Report: React.FC<ReportProps> = ({ rep, unlockedKey, privKey, passphrase }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);

  const showFile = (cid: string, name: string, mime: string) => {
    if (isFetching) {
      toast.info("Please wait while the previous download finishes");
      return;
    }

    if (!unlockedKey) {
      toast.error("Unable to find decryption key.");
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
        return decryptFile(buf, unlockedKey);
      })
      .then((val) => {
        setIsDecrypting(false);
        downloadBlob(val, name, mime);
      })
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
      {isFetching ? (
        <Spinner style={{ height: "1em" }} />
      ) : isDecrypting ? (
        `Decrypting...`
      ) : (
        <>
          {title.length > 35 ? title.substring(0, 35) + "..." : title}
          <EyeIco className={styles.ico} />
        </>
      )}
    </Button>
  );
};

export const Reports: React.FC<ReportsProps> = ({
  passphrase,
  setPassphrase,
  privKey,
  unlockedKey,
  setUnlockedKey,
}) => {
  const { data, error } = useSWR<Res, any>("/api/reports");

  useEffect(() => {
    if (!unlockedKey && passphrase) {
      unlockKey(privKey, passphrase)
        .then((val) => {
          setUnlockedKey(val);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to unlock encryption keys");
        });
    }
  });

  if (error || data?.error)
    return (
      <div className={styles.dash}>
        <h1>Some error occurred.</h1>
      </div>
    );

  if (!data) return <Loader relative />;

  if (!passphrase)
    return (
      <AskPassphrase
        setPassphrase={setPassphrase}
        setUnlockedKey={setUnlockedKey}
        privKey={privKey}
      />
    );

  return (
    <div className={styles.main}>
      <div>
        <h2>Health Documents</h2>
        <div className={styles.ul}>
          {data?.reports.map((r) => (
            <Report
              key={r._id}
              rep={r}
              privKey={privKey}
              passphrase={passphrase}
              unlockedKey={unlockedKey}
            />
          ))}
        </div>
      </div>

      <Upload />
    </div>
  );
};

export default Reports;
