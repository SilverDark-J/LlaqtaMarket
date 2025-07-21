// src/layouts/AuthLayout.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // <--- Asegúrate de importar esto
import styles from "../pages/auth/components/styles/authInputs.module.css";

export default function AuthLayout({
  children,
  imagen,
  alt = "",
  invertirLayout = false,
  titulo = "Tu mercado local al alcance de un clic",
  mostrarInfoEmpresa = true,
  mostrarSubtitulo = true,
}) {
  const navigate = useNavigate(); // <--- Aquí se declara

  return (
    <>
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "transparent",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
          color: "#333",
          zIndex: 999,
        }}
        title="Ir al inicio"
      >
        <i className="fas fa-home"></i>
      </button>

      <div className={styles.registroContenedor}>
        <div className={styles.wrapper}>
          {invertirLayout && (
            <div className={styles.imagenLateral}>
              <div className={styles.infoLateral}>
                <h1 className={styles.nombreEmpresaLogin}>LlaqtaMarket</h1>
                {mostrarSubtitulo && (
                  <p className={styles.subtitulo}>{titulo}</p>
                )}
                <img src={imagen} alt={alt} className={styles.logoLateral} />
              </div>
            </div>
          )}

          <div className={styles.formulario}>
            {mostrarInfoEmpresa && (
              <div className={styles.empresaInfoFila}>
                <div className={styles.logo}>
                  <img
                    src="/src/assets/media/logo2.jpg"
                    alt="Logo LlaqtaMarket"
                  />
                </div>
                <div className={styles.nombreEmpresa}>
                  <h1>LlaqtaMarket</h1>
                </div>
              </div>
            )}
            {children}
          </div>

          {!invertirLayout && (
            <div className={styles.imagenLateral}>
              <img src={imagen} alt={alt} className={styles.logoLateral} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
