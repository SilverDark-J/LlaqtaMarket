import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsuario = localStorage.getItem("usuario");

    if (storedToken && storedUsuario) {
      setToken(storedToken);
      setUsuario(JSON.parse(storedUsuario));
    }
  }, []);

  const login = (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setToken(token);
    setUsuario(usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
