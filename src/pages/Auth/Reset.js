import React from "react";
import { Button, Input } from "../../components";
import styles from "./Reset.module.css";
import logo from "../../static/img/logo.svg";
import useForm from "../../hooks/useForm";
import api from "../../api";

const Reset = () => {
  const password = useForm("password");
  const confirmPass = useForm("password");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) setToken(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.validate() && !password.validate()) {
      return false;
    }
    if (password.value !== confirmPass.value) {
      setError("As senhas devem coincidirem.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const result = await api.reset({ password: password.value, token });
      console.log(result);
    } catch (err) {
      setLoading(false);
      setError("Falha ao enviar o código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <img src={logo} className={styles.logo} alt="Party" />
        {error && <p className={styles.error}>{error}</p>}
        <Input type="password" margin="20px" label="Senha" {...password} />
        <Input
          type="password"
          margin="50px"
          label="Confirme sua senha"
          {...confirmPass}
        />
        {loading ? (
          <Button margin="50px" disabled>
            Enviar
          </Button>
        ) : (
          <Button margin="50px">Enviar</Button>
        )}
      </form>
    </div>
  );
};

export default Reset;
