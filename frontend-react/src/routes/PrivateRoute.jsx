// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

// Verifica si el usuario tiene token JWT (adaptable si usas contexto más adelante)
const isAuthenticated = () => {
  const token = localStorage.getItem("token"); // o sessionStorage
  return !!token;
};

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}
