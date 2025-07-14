import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/registroCliente.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegistroCliente = () => {
  const [formulario, setFormulario] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
  });

  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const validar = () => {
    const nuevosErrores = {};

    if (formulario.nombres.trim().length < 3) {
      nuevosErrores.nombres = "Debe tener al menos 3 caracteres.";
    }

    if (formulario.apellidos.trim().length < 3) {
      nuevosErrores.apellidos = "Debe tener al menos 3 caracteres.";
    }

    const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!regexCorreo.test(formulario.correo)) {
      nuevosErrores.correo = "Correo inválido.";
    }

    const regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
    if (!regexContrasenia.test(formulario.contrasenia)) {
      nuevosErrores.contrasenia =
        "Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (.,_-).";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const validarCampo = (name, value) => {
    let error = "";

    switch (name) {
      case "nombres":
      case "apellidos":
        if (value.trim().length < 3) {
          error = "Debe tener al menos 3 caracteres.";
        }
        break;
      case "correo":
        const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!regexCorreo.test(value)) {
          error = "Correo inválido.";
        }
        break;
      case "contrasenia":
        const regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
        if (!regexContrasenia.test(value)) {
          error =
            "Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (.,_-).";
        }
        break;
      default:
        break;
    }

    setErrores((prev) => ({ ...prev, [name]: error || undefined }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) {
      alert("Corrige los errores antes de enviar.");
      return;
    }

    try {
      setCargando(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formulario,
          tipo_usuario: "cliente",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registro exitoso. ¡Bienvenido!");
        navigate("/login");
      } else {
        alert("❌ " + (data.mensaje || "Error al registrar."));
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const getInputClass = (campo) => {
    if (errores[campo]) return `${styles.input} ${styles.inputError}`;
    if (formulario[campo].length > 2 && !errores[campo]) return `${styles.input} ${styles.inputOk}`;
    return styles.input;
  };

  return (
    <div className={styles.registroContenedor}>
      <div className={styles.wrapper}>
        <div className={styles.formulario}>
          <div className={styles.empresaInfo}>
            <div className={styles.logo}>
              <img src="/src/assets/media/logo2.jpg" alt="Logo LlaqtaMarket" />
            </div>
            <div className={styles.nombreEmpresa}>
              <h1>LlaqtaMarket</h1>
            </div>
          </div>

          <h2>Registro Cliente</h2>
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <input
              type="text"
              name="nombres"
              placeholder="Ingrese su nombre"
              value={formulario.nombres}
              onChange={handleChange}
              onBlur={(e) => validarCampo(e.target.name, e.target.value)}
              className={getInputClass("nombres")}
            />
            {errores.nombres && <span className={styles.errorText}>{errores.nombres}</span>}

            <input
              type="text"
              name="apellidos"
              placeholder="Ingrese su apellido"
              value={formulario.apellidos}
              onChange={handleChange}
              onBlur={(e) => validarCampo(e.target.name, e.target.value)}
              className={getInputClass("apellidos")}
            />
            {errores.apellidos && <span className={styles.errorText}>{errores.apellidos}</span>}

            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={formulario.correo}
              onChange={handleChange}
              onBlur={(e) => validarCampo(e.target.name, e.target.value)}
              className={getInputClass("correo")}
            />
            {errores.correo && <span className={styles.errorText}>{errores.correo}</span>}

            <div className={styles.inputPasswordWrapper}>
              <input
                type={mostrarContrasenia ? "text" : "password"}
                name="contrasenia"
                placeholder="Contraseña"
                value={formulario.contrasenia}
                onChange={handleChange}
                onBlur={(e) => validarCampo(e.target.name, e.target.value)}
                className={getInputClass("contrasenia")}
              />
              <span
                className={styles.togglePasswordIcon}
                onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
              >
                <FontAwesomeIcon icon={mostrarContrasenia ? faEyeSlash : faEye} />
              </span>
            </div>
            {errores.contrasenia && (
              <span className={styles.errorText}>{errores.contrasenia}</span>
            )}

            <button type="submit" disabled={cargando} className={styles.boton}>
              {cargando ? "Registrando..." : "REGISTRARSE"}
            </button>
          </form>

          <p className={styles.textoLogin}>
            <a href="/login">¿Ya tienes una cuenta?</a>
          </p>
        </div>

        <div className={styles.imagenLateral}>
          <img
            src="/src/assets/media/registro_cliente.jpg"
            alt="Registro LlaqtaMarket"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;
