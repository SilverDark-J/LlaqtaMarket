import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/login.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login, usuario } = useAuth();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tocado, setTocado] = useState({ correo: false, contrasena: false });

  const correoRef = useRef(null);
  const contrasenaRef = useRef(null);
  const navigate = useNavigate();

  const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const regexContrasena =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;

  useEffect(() => {
    if (usuario?.rol) {
      switch (usuario.rol) {
        case "cliente":
          navigate("/panel/cliente", { replace: true });
          break;
        case "emprendedor":
          navigate("/panel/emprendedor", { replace: true });
          break;
        case "administrador":
          navigate("/panel/admin", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    }
  }, [usuario?.rol, navigate]);

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!regexCorreo.test(correo)) {
      nuevosErrores.correo = "Correo inválido.";
    }

    if (!contrasena.trim()) {
      nuevosErrores.contrasena = "La contraseña es obligatoria.";
    } else if (!regexContrasena.test(contrasena)) {
      nuevosErrores.contrasena =
        "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (.,_-).";
    }

    setErrores(nuevosErrores);

    if (nuevosErrores.correo) correoRef.current.focus();
    else if (nuevosErrores.contrasena) contrasenaRef.current.focus();

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    try {
      setCargando(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/usuarios/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contrasenia: contrasena }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const { token, usuario } = data;
        login(token, usuario);
      } else {
        alert("❌ " + (data.mensaje || "Credenciales incorrectas."));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h1 className={styles.logo}>LlaqtaMarket</h1>
          <p className={styles.mensaje}>
            Tu mercado local al alcance de un clic
          </p>
          <img
            src="/src/assets/media/logo2.jpg"
            alt="Logo"
            className={styles.loginImg}
          />
        </div>

        <div className={styles.loginRight}>
          <div className={styles.loginBox}>
            <h2>Bienvenido</h2>
            <form onSubmit={handleLogin} noValidate>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Correo electrónico"
                  value={correo}
                  ref={correoRef}
                  onChange={(e) => setCorreo(e.target.value)}
                  onBlur={() =>
                    setTocado((prev) => ({ ...prev, correo: true }))
                  }
                  className={
                    tocado.correo
                      ? errores.correo
                        ? styles.inputError
                        : styles.inputOk
                      : ""
                  }
                />
                {errores.correo && (
                  <span className={styles.errorText}>{errores.correo}</span>
                )}
              </div>

              <div
                className={`${styles.formGroup} ${styles.inputPasswordWrapper}`}
              >
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  placeholder="Contraseña"
                  value={contrasena}
                  ref={contrasenaRef}
                  onChange={(e) => setContrasena(e.target.value)}
                  onBlur={() =>
                    setTocado((prev) => ({ ...prev, contrasena: true }))
                  }
                  className={
                    tocado.contrasena
                      ? errores.contrasena
                        ? styles.inputError
                        : styles.inputOk
                      : ""
                  }
                />
                <span
                  className={styles.togglePasswordIcon}
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  <i
                    className={`fa-solid ${
                      mostrarContrasena ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {errores.contrasena && (
                <span className={styles.errorText}>{errores.contrasena}</span>
              )}

              <button
                type="submit"
                className={styles.loginBtn}
                disabled={cargando}
              >
                {cargando ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className={styles.registerLink}>
              ¿No tienes cuenta? <br />
              <a href="/registro_cliente">Registrarse como Cliente</a> |{" "}
              <a href="/registro_emprendedor">Como Emprendedor</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
