import React from "react";
import styles from "./InputError.module.css";

const InputError = ({ message }) => {
  return (
    <div className={styles.modal}>
      <p>{message}</p>
    </div>
  );
};

export default InputError;
