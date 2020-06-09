import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import styles from "./logReg.module.css";

export const LogReg: React.FC = () => {
  return (
    <section className={styles.container}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </section>
  );
};

export default LogReg;
