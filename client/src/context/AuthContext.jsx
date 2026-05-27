import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// auth provider
export function AuthProvider({ children }) {

  // initialize from localStorage
  const [user, setUser] = useState(() => {

    const storedUser =
      localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const [token, setToken] = useState(() => {

    return localStorage.getItem("token")
      || null;
  });

  // login
  function login(userData, accessToken) {

    setUser(userData);
    setToken(accessToken);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      accessToken
    );
  }

  // logout
  function logout() {

    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider 
    value={{ user, token, login, logout,}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}