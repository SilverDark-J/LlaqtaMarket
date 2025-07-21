import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "./components/FormInput";
import PasswordInput from "./components/PasswordInput";
import SubmitButton from "./components/SubmitButton";
import AuthRedirectLinks from "./components/AuthRedirectLinks";
import { validarCampo } from "../../utils/validators";
import imgRegistro from "../../assets/media/registro_cliente.jpg"; // ✅ Vite-friendly
import styles from "./components/styles/authInputs.module.css";

export default function RegistroClientePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
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
            ...formData,
            tipo_usuario: "cliente",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registro exitoso. ¡Bienvenido!");
        navigate("/login");
      } else {
        alert("❌ Error: " + (data.mensaje || "No se pudo registrar."));
      }
    } catch (error) {
      alert("❌ Error al conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <AuthLayout
      tipo="registro"
      titulo=""
      invertirLayout={false}
      imagen={imgRegistro}
      alt="Registro cliente"
      mostrarInfoEmpresa={true}
      mostrarSubtitulo={false} // para que solo aparezca logo + nombre
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2 className={styles.titulo}>Registro de Cliente</h2>
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
