import React, { Dispatch, SetStateAction } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import styles from "./logReg.module.css";

export type LogRegProps = {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setPassphrase: Dispatch<SetStateAction<string | undefined>>;
};

export const LogReg: React.FC<LogRegProps> = ({ isLoggedIn, setLoggedIn, setPassphrase }) => {
  const location = useLocation<{ referrer: string }>();

  const redirectTo = location.state?.referrer || "/dashboard";

  if (isLoggedIn) return <Redirect to={redirectTo} />;

  return (
    <section className={styles.container}>
      <Switch>
        <Route path="/login">
          <Login setLoggedIn={setLoggedIn} setPassphrase={setPassphrase} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </section>
  );
};

export default LogReg;
