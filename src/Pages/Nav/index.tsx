import React from "react";
import Button from "Components/Button";
import { ReactComponent as Logo } from "Assets/logo.svg";

import styles from "./nav.module.css";

export const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.brandDiv}>
        <Logo className={styles.logo} />
        <div className={styles.nameDiv}>
          <h3 className={styles.heading}>Hygieia</h3>
          <p className={styles.para}>Empowering Safety</p>
        </div>
      </div>
      <Button type="button" style={{ background: "var(--colorAccent)" }}>
        Sign In
      </Button>
    </nav>
  );
};

export default Nav;
