import React from "react";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [login, setLogin] = React.useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};
