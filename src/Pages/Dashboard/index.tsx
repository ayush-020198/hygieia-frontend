import React from "react";
import useSWR from "swr";
import { key } from "openpgp";
import styles from "./dash.module.css";
import Reports from "./Reports";
import Text from "Components/Text";
import Button from "Components/Button";
import Loader from "Components/Loader";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

type Res = {
  error: string;
  user: {
    _id: string;
    name: string;
    email: string;
    keys: {
      privKey: string;
    };
  };
};

export type DashboardProps = {
  passphrase?: string;
  setPassphrase: React.Dispatch<React.SetStateAction<string | undefined>>;
  unlockedKey?: key.Key;
  setUnlockedKey: React.Dispatch<React.SetStateAction<key.Key | undefined>>;
};

export const Dashboard: React.FC<DashboardProps> = ({
  passphrase,
  setPassphrase,
  unlockedKey,
  setUnlockedKey,
}) => {
  const { data, error } = useSWR<Res, any>("/api/user");

  if (error || data?.error)
    return (
      <div className={styles.dash}>
        <h1>Some error occurred.</h1>
      </div>
    );

  if (!data) return <Loader />;

  const {
    user: { name, keys },
  } = data;

  return (
    <div className={styles.dash}>
      <h1>Hello, {name}</h1>
      <hr style={{ width: "100%" }} />
      <section className={styles.main}>
        <form className={styles.details}>
          <h2>Your Details</h2>
          <Text
            title="Past Diseases"
            name="pastDiseases"
            placeholder="Enter your past diseases, separated by comma"
            className={styles.input}
          />
          <Text
            title="BMI (Body Mass index)"
            name="bmi"
            placeholder="BMI"
            type="number"
            className={styles.input}
          />
          <Text
            title="Weight (Kg)"
            name="weight"
            placeholder="Enter your weight"
            type="number"
            className={styles.input}
          />
          <Text
            title="Height (cm)"
            name="height"
            placeholder="Enter your height"
            type="number"
            className={styles.input}
          />
          <Button type="submit" style={{ margin: "2em 0" }}>
            Update <ArrowIcon className={styles.arrow} />
          </Button>
        </form>
        <hr className={styles.verticalBar} />
        <Reports
          passphrase={passphrase}
          setPassphrase={setPassphrase}
          privKey={keys.privKey}
          unlockedKey={unlockedKey}
          setUnlockedKey={setUnlockedKey}
        />
      </section>
    </div>
  );
};

export default Dashboard;
