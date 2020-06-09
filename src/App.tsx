import React from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./App.module.css";

import Home from "Pages/Home";
import Nav from "Pages/Nav";
import LogReg from "Pages/LogReg";

const App = () => {
  return (
    <div className={styles.App}>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path={["/login", "/register"]}>
          <LogReg />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
