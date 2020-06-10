import React, { Dispatch, SetStateAction, useEffect } from "react";
import Text from "Components/Text";
import Button from "Components/Button";
import { useForm } from "react-hook-form";

import toast from "Utils/toast";

import styles from "./ask.module.css";

type PassForm = {
  password: string;
};

export type AskPassphraseProps = { setPassphrase: Dispatch<SetStateAction<string | undefined>> };

export const AskPassphrase: React.FC<AskPassphraseProps> = ({ setPassphrase }) => {
  const { handleSubmit, register, reset, errors } = useForm<PassForm>();

  const onSubmit = (values: PassForm) => {
    setPassphrase(values.password);
    reset();
  };

  useEffect(() => {
    (Object.keys(errors) as Array<keyof PassForm>).forEach((key) => {
      if (errors[key]?.message) toast.error(errors[key]?.message);
    });
  }, [errors]);

  return (
    <div className={styles.div}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Your password is required to unlock the encryption keys</h2>
        <Text
          title="Password"
          name="password"
          placeholder="5uP3rSeCr3t"
          type="password"
          inpRef={register({
            required: "Password is required",
            min: {
              value: 6,
              message: "Password should be of at least 6 characters",
            },
          })}
          haveError={!!errors.password}
        />
        <Button style={{ margin: "2em 0" }} type="submit">
          Unlock
        </Button>
      </form>
    </div>
  );
};

export default AskPassphrase;
