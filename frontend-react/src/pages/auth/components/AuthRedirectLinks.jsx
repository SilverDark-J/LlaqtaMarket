// ✅ src/components/auth/AuthRedirectLinks.jsx
import React from "react";
import styles from "./styles/authInputs.module.css";

export default function AuthRedirectLinks({ tipo }) {
  if (tipo === "login") {
    return (
      <p className={styles.textoLogin}>
        ¿No tienes cuenta? <br />
        <a href="/registro_cliente">Registrarse como Cliente</a> |{" "}
        <a href="/registro_emprendedor">Como Emprendedor</a>
      </p>
    );
  }
  return (
    <div className={styles.registerLink}>
      ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
    </div>
  );
}
