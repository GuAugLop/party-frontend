import React from "react";
import { Navigate, Route } from "react-router";
import api from "../api";
import { Header } from "../components";
import { UserContext } from "../UserContext";

const ProtectedRoute = (props) => {
  const { login, userLogout } = React.useContext(UserContext);
  React.useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        userLogout();
      } else {
        const result = await api.tokenVerify(token);
        if (!result.ok) {
          userLogout();
        }
      }
    };
    verifyToken();
  });

  if (login === true)
    return (
      <>
        <Header />
        <div>
          <Route {...props} />
        </div>
      </>
    );
  else if (login === false) return <Navigate to="/auth/login" />;
  else return null;
};

export default ProtectedRoute;
