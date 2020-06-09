import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Text from "Components/Text";
import Button from "Components/Button";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

import styles from "./logReg.module.css";

type LoginForm = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { handleSubmit, register, errors } = useForm<LoginForm>();

  const onSubmit = (values: LoginForm) => {
    console.log(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Log in to your account</h1>
      <Text
        title="Email"
        name="email"
        placeholder="user@example.com"
        inputSize="large"
        inpRef={register({
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        })}
        haveError={!!errors.email}
      />
      <Text
        title="Password"
        type="password"
        name="password"
        placeholder="5uPerS3crEt"
        inputSize="large"
        inpRef={register({
          required: "Password is required",
          minLength: 6,
        })}
        haveError={!!errors.password}
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
