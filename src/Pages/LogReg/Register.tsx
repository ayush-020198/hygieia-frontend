import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSWRPost from "Hooks/useSWRPost";
import Text from "Components/Text";
import Button from "Components/Button";
import { ReactComponent as ArrowIcon } from "Assets/arrow.svg";

import styles from "./logReg.module.css";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export const Register: React.FC = () => {
  const { handleSubmit, register, errors, reset } = useForm<RegisterForm>();

  const [runRegister, { isValidating }] = useSWRPost<string>("/api/register", {
    onSuccess: (data) => {
      console.log("success", data);
      reset();
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  const onSubmit = (values: RegisterForm) => {
    const data = JSON.stringify(values);
    console.log(values);
    runRegister(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign up for a new account</h1>
      <Text
        title="Name"
        name="name"
        placeholder="Ram Lal"
        inputSize="large"
        inpRef={register({
          required: "Name is required",
        })}
        haveError={!!errors.name}
      />
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
