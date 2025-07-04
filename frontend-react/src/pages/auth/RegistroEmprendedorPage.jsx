import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/registro_emprendedor.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const RegistroEmprendedorPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    emprendimiento: "",
    correo: "",
    contrasenia: "",
  });

  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  const validarCampo = (nombre, valor) => {
    let error = "";

    if (["nombres", "apellidos", "emprendimiento"].includes(nombre) && valor.trim().length < 3) {
      error = "Debe tener al menos 3 caracteres.";
    }

    if (nombre === "correo") {
      const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!regexCorreo.test(valor)) {
        error = "Correo inválido.";
      }
    }

    if (nombre === "contrasenia") {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
      if (!regex.test(valor)) {
        error = "Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (.,_-).";
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: validarCampo(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrores((prev) => ({
      ...prev,
      [name]: validarCampo(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    Object.keys(formData).forEach((campo) => {
      const error = validarCampo(campo, formData[campo]);
      if (error) nuevosErrores[campo] = error;
    });

    setErrores(nuevosErrores);
    setTouched({
      nombres: true,
      apellidos: true,
      emprendimiento: true,
      correo: true,
      contrasenia: true,
    });

    if (Object.keys(nuevosErrores).length > 0) {
      alert("Corrige los errores antes de enviar.");
      return;
    }

    setEnviando(true);

    try {
      const res = await fetch("http://localhost:3000/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          correo: formData.correo,
          contrasenia: formData.contrasenia,
          tipo_usuario: "emprendedor",
          nombre_emprendimiento: formData.emprendimiento,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registro exitoso. ¡Bienvenido a LlaqtaMarket!");
        navigate("/panel_emprendedor");
      } else {
        alert("❌ Error: " + (data.mensaje || "No se pudo registrar."));
      }
    } catch (error) {
      alert("❌ Error al conectar con el servidor.");
      console.error(error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="registro-contenedor">
      <div className="formulario">
        <div className="empresa-info">
          <div className="logo">
            <img src="/src/assets/media/logo2.jpg" alt="Logo LlaqtaMarket" />
          </div>
          <div className="nombre-empresa">
            <h1>LlaqtaMarket</h1>
          </div>
        </div>

        <h2>Registro Emprendedor</h2>
        <form onSubmit={handleSubmit} noValidate>
            {["nombres", "apellidos", "emprendimiento", "correo"].map((campo) => (
                <div key={campo}>
                <input
                    className={`form-input ${
                    touched[campo]
                        ? errores[campo]
                        ? "input-error"
                        : "input-ok"
                        : ""
                    }`}
                    type={campo === "correo" ? "email" : "text"}
                    name={campo}
                    placeholder={
                    campo === "nombres"
                        ? "Ingrese su nombre"
                        : campo === "apellidos"
                        ? "Ingrese su apellido"
                        : campo === "emprendimiento"
                        ? "Nombre del Emprendimiento"
                        : "Correo"
                    }
                    value={formData[campo]}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
                {errores[campo] && touched[campo] && (
                    <span className="error-text">{errores[campo]}</span>
                )}
                </div>
            ))}

          <div className="input-password-wrapper">
            <input
                className={`form-input ${
                touched.contrasenia
                    ? errores.contrasenia
                    ? "input-error"
                    : "input-ok"
                    : ""
                }`}
                type={mostrarContrasenia ? "text" : "password"}
                name="contrasenia"
                placeholder="Contraseña"
                value={formData.contrasenia}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
            <span
                className="toggle-password-icon"
                onClick={() => setMostrarContrasenia((prev) => !prev)}
            >
                {mostrarContrasenia ? <FaEyeSlash /> : <FaEye />}
            </span>
            </div>
            {errores.contrasenia && touched.contrasenia && (
            <span className="error-text">{errores.contrasenia}</span>
            )}

          <button type="submit" disabled={enviando}>
            {enviando ? "Registrando..." : "REGISTRARSE"}
          </button>
        </form>

        <p className="texto-login">
          <a href="/login">¿Ya tienes una cuenta?</a>
        </p>
      </div>

      <div className="imagen-lateral">
        <img
          src="/src/assets/media/registro_emprendedor.jpg"
          alt="Registro emprendedor"
        />
      </div>
    </div>
  );
};

export default RegistroEmprendedorPage;
