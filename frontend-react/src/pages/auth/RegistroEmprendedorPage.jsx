import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./components/styles/authInputs.module.css";

import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "./components/FormInput";
import PasswordInput from "./components/PasswordInput";
import SubmitButton from "./components/SubmitButton";
import AuthRedirectLinks from "./components/AuthRedirectLinks";

import { validarCampo } from "../../utils/validators";

export default function RegistroEmprendedorPage() {
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

  return (
    <AuthLayout
      tipo="registro"
      titulo=""
      invertirLayout={false}
      imagen="/src/assets/media/registro_emprendedor.jpg"
      alt="Registro cliente"
      mostrarInfoEmpresa={true}
      mostrarSubtitulo={false} // para que solo aparezca logo + nombre
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2 className={styles.titulo}>Registro de Emprendedor</h2>
        <FormInput
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errores.nombres}
          touched={touched.nombres}
        />
        <FormInput
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errores.apellidos}
          touched={touched.apellidos}
        />
        <FormInput
          name="emprendimiento"
          placeholder="Nombre del Emprendimiento"
          value={formData.emprendimiento}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errores.emprendimiento}
          touched={touched.emprendimiento}
        />
        <FormInput
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errores.correo}
          touched={touched.correo}
        />
        <PasswordInput
          name="contrasenia"
          placeholder="Contraseña"
          value={formData.contrasenia}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errores.contrasenia}
          touched={touched.contrasenia}
          mostrar={mostrarContrasenia}
          toggleMostrar={() => setMostrarContrasenia((prev) => !prev)}
        />

        <SubmitButton loading={enviando} texto="REGISTRARSE" />
      </form>

      <AuthRedirectLinks tipo="register" />
    </AuthLayout>
  );
}
