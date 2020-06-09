import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { SWRConfig } from "swr";
import cookie from "js-cookie";
import fetcher from "Utils/fetcher";
import styles from "./App.module.css";

import ProtectedRoute from "Components/ProtectedRoute";

import Home from "Pages/Home";
import Nav from "Pages/Nav";
import LogReg from "Pages/LogReg";
import Dashboard from "Pages/Dashboard";
import Logout from "Pages/Logout";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(cookie.get("signedIn") === "true");
  const [passphrase, setPassphrase] = useState<string>();

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
      }}
    >
      <div className={styles.App}>
        <Nav isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path={["/login", "/register"]}>
            <LogReg
              isLoggedIn={isLoggedIn}
              setLoggedIn={setLoggedIn}
              setPassphrase={setPassphrase}
            />
          </Route>
          <ProtectedRoute exact path="/dashboard" isLoggedIn={isLoggedIn}>
            <Dashboard passphrase={passphrase} setPassphrase={setPassphrase} />
          </ProtectedRoute>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </SWRConfig>
  );
};

export default App;
