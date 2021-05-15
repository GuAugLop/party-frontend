import React from "react";
import styles from "./Register.module.css";
import logo from "../../static/img/logo.svg";
import { Input, Button } from "../../components/index";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import api from "../../api";

const Login = () => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const name = useForm(true);
  const lastName = useForm(true);
  const username = useForm("username");
  const email = useForm("email");
  const password = useForm("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name.validate() &&
      lastName.validate() &&
      email.validate() &&
      password.validate() &&
      username.validate()
    ) {
      try {
        setLoading(true);
        const result = await api.register({
          email: email.value,
          password: password.value,
          name: `${name.value} ${lastName.value}`,
          username: username.value,
        });
        const json = await result.json();

        if (!result.ok) {
          setError(json.msg);
          return;
        }
        setError(false);

        console.log(result);
      } catch (err) {
        setError("Falha ao realizar registro.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <img src={logo} className={styles.logo} alt="Party" />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.nameContainer}>
          <div className={styles.name}>
            <Input label="Nome" {...name} />
          </div>
          <div className={styles.name}>
            <Input label="Sobrenome" {...lastName} />
          </div>
        </div>
        <Input
          name="username"
          label="Nome de usuário"
          type="string"
          {...username}
          desc="As pessoas te acharão assim!"
        />
        <Input
          name="email"
          label="Email"
          type="email"
          {...email}
          margin="30px"
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          {...password}
          margin="50px"
        />

        {loading ? (
          <Button margin="50px" disabled>
            Criar
          </Button>
        ) : (
          <Button margin="50px">Criar</Button>
        )}
        <Link to="../login" style={{ marginTop: "50px" }}>
          Já possuo uma conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
