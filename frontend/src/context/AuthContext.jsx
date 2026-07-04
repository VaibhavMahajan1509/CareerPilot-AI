import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("careerpilot_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("careerpilot_token");
  });

  const login = (userData, authToken) => {
    localStorage.setItem("careerpilot_user", JSON.stringify(userData));
    localStorage.setItem("careerpilot_token", authToken);

    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem("careerpilot_user");
    localStorage.removeItem("careerpilot_token");

    setUser(null);
    setToken(null);
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};