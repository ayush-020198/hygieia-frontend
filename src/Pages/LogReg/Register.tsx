import React from "react";
import { Link } from "react-router-dom";
import Text from "Components/Text";
import Button from "Components/Button";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

import styles from "./logReg.module.css";


export const Register: React.FC = () => {
  return (
    <form className={styles.form}>
      <h1>Sign up for a new account</h1>
      <Text title="Name" name="name" placeholder="Ram Lal" inputSize="large" />
      <Text title="Email" name="email" placeholder="user@example.com" inputSize="large" />
      <Text
        title="Password"
        type="password"
        name="password"
        placeholder="5uPerS3crEt"
        inputSize="large"
      />
      <Button type="submit" style={{ margin: "2em 0" }}>
        Register <ArrowIcon className={styles.arrow} />
      </Button>
      <hr />
      <p className={styles.sub}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </form>
  );
};

export default Register;
