import React from "react";
import { ReactComponent as Spinner } from "Assets/three-dots.svg";

import styles from "./loader.module.css";

export type LoaderProps = { relative?: boolean };

export const Loader: React.FC<LoaderProps> = ({ relative = false }) => {
  return (
    <div className={relative ? styles.relative : styles.loader}>
      <Spinner style={{ height: "3em" }} />
    </div>
  );
};

export default Loader;
