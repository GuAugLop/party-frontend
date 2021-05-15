import React from "react";
import { Button, Input } from "../../components";
import useForm from "../../hooks/useForm";
import styles from "./Forgot.module.css";
import logo from "../../static/img/logo.svg";
import { Link } from "react-router-dom";
import api from "../../api";

const Forgot = () => {
  const email = useForm("email");
  const [success, setSucess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.forgot({ email: email.value });
    } catch (err) {
      setSucess(true);
    } finally {
      setSucess(true);
    }
  };

  return (
    <div className={styles.container}>
      {!success ? (
        <form className={styles.modal} onSubmit={handleSubmit}>
          <img src={logo} alt="Party" className={styles.logo} />
          {success && <p>Código Enviado</p>}
          <p>Insira seu email abaixo:</p>
          <Input label="Email" name="email" {...email} />
          <Button margin="30px">Enviar Código</Button>
        </form>
      ) : (
        <div className={styles.success}>
          Email Enviado, verifique a caixa de SPAM
        </div>
      )}

      <Link to="../login" className={styles.back}>
        Voltar
      </Link>
    </div>
  );
};

export default Forgot;
