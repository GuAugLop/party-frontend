import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, margin, width, onClick, ...props }) => {
  const style = {
    marginTop: margin || "default",
    width: width || "default",
  };

  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
