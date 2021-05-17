import React from "react";
import styles from "./Login.module.css";
import logo from "../../static/img/logo.svg";
import { Input, Button } from "../../components/index";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Login = () => {
  const email = useForm("email");
  const password = useForm("password");
  const [error, setError] = React.useState(null);
  const { userLogin, loading } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email, password, setError);
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

        {loading ? (
          <Button margin="50px" width="100%" disabled>
            Entrar
          </Button>
        ) : (
          <Button margin="50px" width="100%">
            Entrar
          </Button>
        )}
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
