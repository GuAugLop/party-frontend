import React from "react";
import styles from "./Register.module.css";
import logo from "../../static/img/logo.svg";
import { Input, Button } from "../../components/index";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import NewAvatar from "./NewAvatar";

const Login = () => {
  const [newAccount, setNewAccount] = React.useState(false);

  const name = useForm(true);
  const lastName = useForm(true);
  const username = useForm("username");
  const email = useForm("email");
  const password = useForm("password");
  const [error, setError] = React.useState(null);

  const { userRegister, loading } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccount = await userRegister(
      email,
      password,
      name,
      lastName,
      username,
      setError
    );
    if (newAccount === true) {
      setNewAccount(true);
    }
  };

  if (newAccount) {
    return <NewAvatar />;
  }

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
          <Button margin="50px" width="100%" disabled>
            Criar
          </Button>
        ) : (
          <Button margin="50px" width="100%">
            Criar
          </Button>
        )}
        <Link to="../login" style={{ marginTop: "50px" }}>
          Já possuo uma conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
