import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { SWRConfig } from "swr";
import cookie from "js-cookie";
import fetcher from "Utils/fetcher";
import styles from "./App.module.css";

import Home from "Pages/Home";
import Nav from "Pages/Nav";
import LogReg from "Pages/LogReg";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(cookie.get("signedIn") === "true");

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <div className={styles.App}>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path={["/login", "/register"]}>
            <LogReg isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </div>
    </SWRConfig>
  );
};

export default App;
