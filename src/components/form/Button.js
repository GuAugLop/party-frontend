import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, margin, ...props }) => {
  return (
    <button
      className={styles.button}
      style={margin && { marginTop: margin }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
