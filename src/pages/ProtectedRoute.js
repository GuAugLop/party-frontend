import React from "react";
import { Navigate, Route } from "react-router";
import { Header } from "../components";
import { UserContext } from "../UserContext";

const ProtectedRoute = (props) => {
  const { login, userLogout } = React.useContext(UserContext);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      userLogout();
    }
  });

  if (login === true)
    return (
      <>
        <Header />
        <Route {...props} />
      </>
    );
  else if (login === false) return <Navigate to="/auth/login" />;
  else return null;
};

export default ProtectedRoute;
