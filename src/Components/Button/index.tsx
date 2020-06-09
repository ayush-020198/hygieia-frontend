import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "regular" | "large";
  wide?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  size = "regular",
  wide = false,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={classNames(styles.button, styles[size], { [styles.wide]: wide }, className)}
    >
      {children}
    </button>
  );
};

export default Button;
