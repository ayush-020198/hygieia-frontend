import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Button from "Components/Button";
import { ReactComponent as Logo } from "Assets/logo.svg";
import { ReactComponent as OutIcon } from "Assets/out.svg";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

import styles from "./nav.module.css";

type NavProps = {
  isLoggedIn: boolean;
};

export const Nav: React.FC<NavProps> = ({ isLoggedIn }) => {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <div className={styles.brandDiv}>
          <Logo className={styles.logo} />
          <div className={styles.nameDiv}>
            <h3 className={styles.heading}>Hygieia</h3>
            <p className={styles.para}>Empowering Safety</p>
          </div>
        </div>
      </Link>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/">
            <Link to="/dashboard">
              <Button type="button" style={{ background: "var(--colorAccent)" }}>
                Dashboard <ArrowIcon className={styles.ico} />
              </Button>
            </Link>
          </Route>
          <Route>
            <Link to="/logout">
              <Button type="button" style={{ background: "var(--colorAccent)" }}>
                Log Out <OutIcon className={styles.ico} />
              </Button>
            </Link>
          </Route>
        </Switch>
      ) : (
        <Link to="/login">
          <Button type="button" style={{ background: "var(--colorAccent)" }}>
            Sign In
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
