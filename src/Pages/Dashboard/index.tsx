import React from "react";
import useSWR from "swr";
import styles from "./dash.module.css";
import Reports from "./Reports";
import Text from "Components/Text";
import Button from "Components/Button";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

type Res = {
  error: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

export const Dashboard: React.FC = () => {
  const { data, error } = useSWR<Res, any>("/api/user");

  if (error || data?.error)
    return (
      <div className={styles.dash}>
        <h1>Some error occurred.</h1>
      </div>
    );

  if (!data)
    return (
      <div className={styles.dash}>
        <h1>Loading..</h1>
      </div>
    );

  const {
    user: { name },
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
        <Reports />
      </section>
    </div>
  );
};

export default Dashboard;
