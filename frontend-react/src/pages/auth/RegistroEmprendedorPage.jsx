import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/registroEmprendedor.module.css";
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
    if (
      ["nombres", "apellidos", "emprendimiento"].includes(nombre) &&
      valor.trim().length < 3
    ) {
      return "Debe tener al menos 3 caracteres.";
    }

    if (nombre === "correo") {
      const regexCorreo = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!regexCorreo.test(valor)) return "Correo inválido.";
    }

    if (nombre === "contrasenia") {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_-])[A-Za-z\d.,_-]{8,}$/;
      if (!regex.test(valor)) {
        return "Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo (.,_-).";
      }
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/usuarios/registro`,
        {
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
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registro exitoso. ¡Bienvenido a LlaqtaMarket!");
        navigate("/login");
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

  const renderInput = (name, placeholder, type = "text") => (
    <div key={name}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${styles.formInput} ${
          touched[name]
            ? errores[name]
              ? styles.inputError
              : styles.inputOk
            : ""
        }`}
      />
      {errores[name] && touched[name] && (
        <span className={styles.errorText}>{errores[name]}</span>
      )}
    </div>
  );

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

          <h2>Registro Emprendedor</h2>
          <form onSubmit={handleSubmit} noValidate>
            {renderInput("nombres", "Ingrese su nombre")}
            {renderInput("apellidos", "Ingrese su apellido")}
            {renderInput("emprendimiento", "Nombre del Emprendimiento")}
            {renderInput("correo", "Correo", "email")}

            <div className={styles.inputPasswordWrapper}>
              <input
                type={mostrarContrasenia ? "text" : "password"}
                name="contrasenia"
                placeholder="Contraseña"
                value={formData.contrasenia}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.formInput} ${
                  touched.contrasenia
                    ? errores.contrasenia
                      ? styles.inputError
                      : styles.inputOk
                    : ""
                }`}
              />
              <span
                className={styles.togglePasswordIcon}
                onClick={() => setMostrarContrasenia((prev) => !prev)}
              >
                {mostrarContrasenia ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errores.contrasenia && touched.contrasenia && (
              <span className={styles.errorText}>{errores.contrasenia}</span>
            )}

            <button type="submit" disabled={enviando} className={styles.boton}>
              {enviando ? "Registrando..." : "REGISTRARSE"}
            </button>
          </form>

          <p className={styles.textoLogin}>
            <a href="/login">¿Ya tienes una cuenta?</a>
          </p>
        </div>

        <div className={styles.imagenLateral}>
          <img
            src="/src/assets/media/registro_emprendedor.jpg"
            alt="Registro emprendedor"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistroEmprendedorPage;
