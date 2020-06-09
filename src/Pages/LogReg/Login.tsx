import React from "react";
import { Link } from "react-router-dom";
import Text from "Components/Text";
import Button from "Components/Button";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

import styles from "./logReg.module.css";

export const Login: React.FC = () => {
  return (
    <form className={styles.form}>
      <h1>Log in to your account</h1>
      <Text title="Email" name="email" placeholder="user@example.com" inputSize="large" />
      <Text
        title="Password"
        type="password"
        name="password"
        placeholder="5uPerS3crEt"
        inputSize="large"
      />
      <Button type="submit" style={{ margin: "2em 0" }}>
        Log In <ArrowIcon className={styles.arrow} />
      </Button>
      <hr />
      <p className={styles.sub}>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
