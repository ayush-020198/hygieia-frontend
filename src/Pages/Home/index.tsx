import React from "react";
import Button from "Components/Button";
import { ReactComponent as HeroImg } from "Assets/health.svg";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

import styles from "./home.module.css";

export const Home: React.FC = () => {
  return (
    <section className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.heading}>We take care of your</h1>
        <h1 className={styles.heading}>
          <span className={styles.brand}>Health&nbsp;</span>
          <span className={styles.accent}>Records</span>
        </h1>
        <p className={styles.para}>
          Empowering your existing health records with the power of blockchain for faster, easier
          and safe access.
        </p>
        <Button style={{ background: "var(--colorBrand)" }} type="button">
          Try Now <ArrowIcon className={styles.arrow} />
        </Button>
      </div>
      <div className={styles.heroDiv}>
        <HeroImg className={styles.hero} />
      </div>
    </section>
  );
};

export default Home;
