import React from "react";
import { InputError } from "..";
import styles from "./Input.module.css";

const Input = ({
  label,
  type,
  error,
  value,
  onChange,
  onBlur,
  validate,
  name,
  desc,
  margin,
  width,
  className,
  height,
  ...props
}) => {
  const style = {
    marginTop: margin || "",
    width: width || "100%",
    height: height || "auto",
  };
  return (
    <div className={styles.wrapper} style={style}>
      <input
        placeholder={label}
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        {...props}
        style={error && { border: "solid 2px red" }}
        className={styles.input}
      />
      {error && <InputError message={error} />}
      {desc && <small className={styles.desc}>{desc}</small>}
    </div>
  );
};

export default Input;
