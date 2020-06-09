import React, { LabelHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './label.module.css';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  title: string;
  size?: "small" | "regular" | "large" | "full";
}
export const Label: React.FC<LabelProps> = ({ children, size = "full", title, className, ...rest }) => {
    return (
        <label {...rest} className={classNames(styles.label, styles[size], className)}>
          <span className={styles.title}>{title}</span>
          {children}
        </label>
    )
};

export default Label;
