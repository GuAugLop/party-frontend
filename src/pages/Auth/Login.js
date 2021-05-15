import React from "react";
import styles from "./Login.module.css";
import logo from "../../static/img/logo.svg";
import { Input, Button } from "../../components/index";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import api from "../../api";

const Login = () => {
  const email = useForm("email");
  const password = useForm("password");
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      const result = await api.login({
        email: email.value,
        password: password.value,
      });
      const json = await result.json();

      if (!result.ok) {
        setError(json.msg);
      }
      console.log(json);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <img src={logo} className={styles.logo} alt="Party" />
        {error && <p className={styles.error}>{error}</p>}
        <Input
          name="email"
          label="Email"
          type="email"
          {...email}
          margin="50px"
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          {...password}
          margin="50px"
        />

        <Button margin="50px">Entrar</Button>
        <Link to="../register" style={{ marginTop: "50px" }}>
          Criar nova conta
        </Link>
        <Link to="../forgot" style={{ marginTop: "50px" }}>
          Esqueci minha senha
        </Link>
      </form>
    </div>
  );
};

export default Login;
