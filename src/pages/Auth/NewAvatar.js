import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./NewAvatar.module.css";
import logo from "../../static/img/logo.svg";
import { Crop } from "../../components";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Link } from "react-router-dom";
import { Button } from "../../components";
import api from "../../api";
import style from "../../components/Crop/Crop.module.css";

const NewAvatar = () => {
  const [base64, setBase64] = React.useState(null);

  const handleSubmit = async () => {
    const result = await api.changeAvatar({
      base64: base64.base64,
      name: base64.name,
    });
    const json = await result.json();
    console.log(json);
  };
  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="PARTY" />
      </header>
      <div className={styles.container}>
        <Crop setBase64={setBase64} />
        <br />
        <hr />
        <p className={style.desc}>Hora de selecionar uma foto de perfil</p>
        <div className={style.footerBtn}>
          <Link to="/">Pular etapa</Link>
          <Button
            width="150px"
            onClick={handleSubmit}
            disabled={base64 ? false : true}
          >
            Continuar
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewAvatar;
