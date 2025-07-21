// ✅ src/pages/auth/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import FormInput from "./components/FormInput";
import PasswordInput from "./components/PasswordInput";
import SubmitButton from "./components/SubmitButton";
import AuthRedirectLinks from "./components/AuthRedirectLinks";
import { validarCampo } from "../../utils/validators";
import { useAuth } from "../../context/AuthContext";
import styles from "./components/styles/authInputs.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, usuario } = useAuth();

  const [formData, setFormData] = useState({
    correo: "",
    contrasenia: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // ✅ Redirige al usuario dependiendo del rol si ya está logueado
  useEffect(() => {
    if (!usuario?.rol) return;

    switch (usuario.rol) {
      case "cliente":
        navigate("/", { replace: true });
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
  }, [usuario?.rol, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validarCampo(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validarCampo(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = {
      correo: validarCampo("correo", formData.correo),
      contrasenia: validarCampo("contrasenia", formData.contrasenia),
    };

    setErrors(nuevosErrores);
    setTouched({ correo: true, contrasenia: true });

    if (Object.values(nuevosErrores).some((error) => error)) return;

    setEnviando(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/usuarios/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        const { token, usuario } = data;
        login(token, usuario); // ← esto activa el useEffect
      } else {
        alert("❌ " + (data.mensaje || "Credenciales inválidas"));
      }
    } catch (error) {
      alert("❌ Error de conexión");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <AuthLayout
      tipo="login"
      titulo="Tu mercado local al alcance de un clic"
      invertirLayout
      imagen="/src/assets/media/logo2.jpg"
      alt="Logo LlaqtaMarket"
      mostrarInfoEmpresa={false}
      mostrarSubtitulo={true}
    >
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h2 className={styles.titulo}>Bienvenido</h2>

        <FormInput
          name="correo"
          type="email"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.correo}
          touched={touched.correo}
          className={styles.formGroup}
        />

        <PasswordInput
          name="contrasenia"
          placeholder="Contraseña"
          value={formData.contrasenia}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.contrasenia}
          touched={touched.contrasenia}
          mostrar={mostrarContrasenia}
          toggleMostrar={toggleMostrarContrasenia}
          className={styles.formGroup}
        />

        <SubmitButton
          texto="Iniciar Sesión"
          loading={enviando}
          className={styles.submitButton}
        />

        <AuthRedirectLinks tipo="login" />
      </form>
    </AuthLayout>
  );
}
