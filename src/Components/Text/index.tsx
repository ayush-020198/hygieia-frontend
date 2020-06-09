import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./text.module.css";
import Label, { LabelProps } from "Components/Label";

export type TextProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "number" | "password";
  inputSize?: "small" | "regular" | "large" | "full";
  title: string;
  haveError?: boolean;
  labelProps?: LabelProps;
};

export const Text: React.FC<TextProps> = ({
  type = "text",
  inputSize = "regular",
  className,
  title,
  haveError = false,
  labelProps,
  ...rest
}) => {
  return (
    <Label title={title} size={inputSize} {...labelProps}>
      <input
        {...rest}
        type={type}
        className={classNames(styles.input, className, { [styles.error]: haveError })}
      />
    </Label>
  );
};

export default Text;
