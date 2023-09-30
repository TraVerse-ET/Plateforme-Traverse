import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState();

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return (
    <TokenContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}
