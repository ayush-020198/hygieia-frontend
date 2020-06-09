import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSWRPost from "Hooks/useSWRPost";

import Text from "Components/Text";
import Button from "Components/Button";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

import styles from "./logReg.module.css";

type LoginForm = {
  email: string;
  password: string;
};

export type LoginProps = {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  setPassphrase: Dispatch<SetStateAction<string | undefined>>;
};

export const Login: React.FC<LoginProps> = ({ setLoggedIn, setPassphrase }) => {
  const { handleSubmit, register, errors, reset } = useForm<LoginForm>();

  const [runLogin, { isValidating }] = useSWRPost<string>("/api/login", {
    onSuccess: (data) => {
      console.log("success", data);
      reset();
      setLoggedIn(true);
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  const onSubmit = (values: LoginForm) => {
    const data = JSON.stringify(values);
    setPassphrase(values.password);
    runLogin(data);
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
      <Button type="submit" style={{ margin: "2em 0" }} disabled={isValidating}>
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
