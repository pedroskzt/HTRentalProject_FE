import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [accessToken, setAccessTokenState] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [username, setUsernameState] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [password, setPasswordState] = useState<string | null>(
    localStorage.getItem("password")
  );

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const setUsername = (name: string | null) => {
    setUsernameState(name);
    if (name) {
      localStorage.setItem("username", name);
    } else {
      localStorage.removeItem("username");
    }
  };

  const setPassword = (pass: string | null) => {
    setPasswordState(pass);
    if (pass) {
      localStorage.setItem("password", pass);
    } else {
      localStorage.removeItem("password");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("username");
    const pass = localStorage.getItem("password");

    setAccessTokenState(token);
    setUsernameState(name);
    setPasswordState(pass);
  }, []);

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
