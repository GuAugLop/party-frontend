import React from "react";
import styles from "./NewAvatar.module.css";
import logo from "../../static/img/logo.svg";
import { Crop } from "../../components";

import "react-image-crop/dist/ReactCrop.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import api from "../../api";
import style from "../../components/Crop/Crop.module.css";
import { UserContext } from "../../UserContext";

const NewAvatar = () => {
  const [base64, setBase64] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { setUser, user } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!base64.name || !base64.base64) {
      setError("É preciso enviar uma imagem para isso.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const result = await api.changeAvatar({
        base64: base64.base64,
        name: base64.name,
      });
      const json = await result.json();
      user.thumb = json.user.thumb;
      setUser(user);
      navigate("/");
    } catch (err) {
      setError("Falha ao fazer o envio. Tente novamente mais tarde");
      navigate("/");
    }
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
        {error && <p className={styles.error}>{error}</p>}
        <p className={style.desc}>Hora de selecionar uma foto de perfil</p>
        <div className={style.footerBtn}>
          <Link to="/">Pular etapa</Link>
          <Button
            width="150px"
            onClick={handleSubmit}
            disabled={loading ? true : false || base64 ? false : true}
          >
            Continuar
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewAvatar;
