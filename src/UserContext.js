import React from "react";
import { useNavigate } from "react-router";
import api from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          const response = await api.tokenVerify(token);
          const json = await response.json();
          if (!response.ok) {
            userLogout();
          } else {
            setUser(json.user);
            setLogin(true);
            navigate("/");
          }
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [navigate]);

  async function userLogin(email, password, setError) {
    try {
      setLoading(true);
      setError(null);

      const result = await api.login({
        email: email.value,
        password: password.value,
      });
      const json = await result.json();
      if (!result.ok) {
        setError(json.msg);
      } else {
        setUser(json.data);
        setLogin(true);
        setError("ola");
        localStorage.setItem("token", json.token);
        navigate("/");
      }
    } catch (err) {
      setError("Falha ao realizar login");
    } finally {
      setLoading(false);
    }
  }

  async function userRegister(
    email,
    password,
    name,
    lastName,
    username,
    setError
  ) {
    try {
      setLoading(true);
      setError(false);
      const result = await api.register({
        email: email.value,
        password: password.value,
        name: `${name.value} ${lastName.value}`,
        username: username.value,
      });
      const json = await result.json();

      if (!result.ok) {
        setError(json.msg);
        return false;
      } else {
        localStorage.setItem("token", json.token);
        setLogin(true);
        setUser(json.data);
        setError(null);
        return true;
      }
    } catch (err) {
      console.log(err);
      setError("Falha ao realizar Registro");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    setUser(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        userLogin,
        userRegister,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
