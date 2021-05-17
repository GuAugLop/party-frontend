import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, margin, width, onClick, height, ...props }) => {
  const style = {
    marginTop: margin || "default",
    width: width || "auto",
    height: height || "default",
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
