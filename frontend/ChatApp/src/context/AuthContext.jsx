/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = React.useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  useEffect(() => {
    const theme = authUser?.theme || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [authUser?.theme]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
