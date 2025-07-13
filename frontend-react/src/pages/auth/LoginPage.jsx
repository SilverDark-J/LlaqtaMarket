import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"; // Asegúrate de tener estilos .input-error y .input-ok
import "@fortawesome/fontawesome-free/css/all.min.css";

const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errores, setErrores] = useState({});
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tocado, setTocado] = useState({
    correo: false,
    contrasena: false,
  });

  const correoRef = useRef(null);
  const contrasenaRef = useRef(null);
  const navigate = useNavigate();

  const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const regexContrasena =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;

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

    if (nuevosErrores.correo) {
      correoRef.current.focus();
    } else if (nuevosErrores.contrasena) {
      contrasenaRef.current.focus();
    }

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleBlur = (campo) => {
    setTocado((prev) => ({ ...prev, [campo]: true }));
    const nuevosErrores = { ...errores };

    if (campo === "correo") {
      if (!correo.trim()) {
        nuevosErrores.correo = "El correo es obligatorio.";
      } else if (!regexCorreo.test(correo)) {
        nuevosErrores.correo = "Correo inválido.";
      } else {
        delete nuevosErrores.correo;
      }
    }

    if (campo === "contrasena") {
      if (!contrasena.trim()) {
        nuevosErrores.contrasena = "La contraseña es obligatoria.";
      } else if (!regexContrasena.test(contrasena)) {
        nuevosErrores.contrasena =
          "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (.,_-).";
      } else {
        delete nuevosErrores.contrasena;
      }
    }

    setErrores(nuevosErrores);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    try {
      setCargando(true);

      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo, contrasenia: contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("tipo_usuario", data.tipo_usuario);

        switch (data.tipo_usuario) {
          case "cliente":
            navigate("/panel_cliente");
            break;
          case "emprendedor":
            navigate("/panel_emprendedor");
            break;
          case "administrador":
            navigate("/panel_admin");
            break;
          default:
            alert("Tipo de usuario no reconocido.");
        }
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
    <div className="login-container">
      <div className="login-left">
        <h1 className="logo">LlaqtaMarket</h1>
        <p className="mensaje">Tu mercado local al alcance de un clic</p>
        <img
          src="/src/assets/media/logo2.jpg"
          alt="Logo"
          className="login-img"
        />
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Bienvenido</h2>
          <form onSubmit={handleLogin} noValidate>
            <div className="form-group">
              <input
                type="text"
                placeholder="Correo electrónico"
                value={correo}
                ref={correoRef}
                onChange={(e) => setCorreo(e.target.value)}
                onBlur={() => handleBlur("correo")}
                className={
                  tocado.correo
                    ? errores.correo
                      ? "input-error"
                      : "input-ok"
                    : ""
                }
              />
              {errores.correo && (
                <span className="error-text">{errores.correo}</span>
              )}
            </div>

            <div className="form-group input-password-wrapper">
              <input
                type={mostrarContrasena ? "text" : "password"}
                placeholder="Contraseña"
                value={contrasena}
                ref={contrasenaRef}
                onChange={(e) => setContrasena(e.target.value)}
                onBlur={() => handleBlur("contrasena")}
                className={
                  tocado.contrasena
                    ? errores.contrasena
                      ? "input-error"
                      : "input-ok"
                    : ""
                }
              />
              <span
                className="toggle-password-icon"
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
              <span className="error-text">{errores.contrasena}</span>
            )}

            <button type="submit" className="login-btn" disabled={cargando}>
              {cargando ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="register-link">
            ¿No tienes cuenta? <br />
            <a href="/registro_cliente">Registrarse como Cliente</a> |{" "}
            <a href="/registro_emprendedor">Como Emprendedor</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
