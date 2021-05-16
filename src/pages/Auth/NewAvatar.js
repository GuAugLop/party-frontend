import React from "react";
import styles from "./NewAvatar.module.css";
import logo from "../../static/img/logo.svg";
import { Crop } from "../../components";

const NewAvatar = () => {
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="PARTY" />
      </header>
      <div className={styles.container}>
        <Crop />
      </div>
    </>
  );
};

export default NewAvatar;
