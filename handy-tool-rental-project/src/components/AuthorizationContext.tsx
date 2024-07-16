import React, { ReactNode, createContext, useContext, useState } from "react";

interface AuthorizationContextProps {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  password: string | null;
  setPassword: (password: string | null) => void;
}

const AuthorizationContext = createContext<
  AuthorizationContextProps | undefined
>(undefined);

const AuthorizationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  return (
    <AuthorizationContext.Provider
      value={{
        accessToken,
        setAccessToken,
        username,
        setUsername,
        password,
        setPassword,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (context === undefined) {
    throw new Error("The useAuthorization must be used with a Provider.");
  }
  return context;
};

export { AuthorizationProvider, useAuthorization };
