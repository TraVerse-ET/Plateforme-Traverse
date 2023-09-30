import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export function useTokenContext() {
  return useContext(TokenContext);
}

// Créez une fonction pour récupérer le token depuis le stockage de session
const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
};

export function TokenProvider({ children }) {
  const [token, setToken] = useState(getToken());

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
