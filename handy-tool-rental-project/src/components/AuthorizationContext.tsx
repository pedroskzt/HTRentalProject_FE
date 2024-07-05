import React, { ReactNode, createContext, useContext, useState } from "react";

interface AuthorizationContextProps {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
}

const AuthorizationContext = createContext<
  AuthorizationContextProps | undefined
>(undefined);

const AuthorizationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthorizationContext.Provider value={{ accessToken, setAccessToken }}>
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
