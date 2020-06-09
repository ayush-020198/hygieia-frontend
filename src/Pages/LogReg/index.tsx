import React, { Dispatch, SetStateAction } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import styles from "./logReg.module.css";

export type LogRegProps = {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const LogReg: React.FC<LogRegProps> = ({ isLoggedIn, setLoggedIn }) => {
  if (isLoggedIn) return <Redirect to="/dashboard" />;

  return (
    <section className={styles.container}>
      <Switch>
        <Route path="/login">
          <Login setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </section>
  );
};

export default LogReg;
