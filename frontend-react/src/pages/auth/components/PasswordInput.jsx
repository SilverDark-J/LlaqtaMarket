// ✅ src/components/auth/PasswordInput.jsx
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles/authInputs.module.css";

export default function PasswordInput({
  name = "contrasenia",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  mostrar,
  toggleMostrar,
  className = "",
}) {
  const showError = touched && error;
  const inputClass = `${styles.input} ${
    showError ? styles.inputError : value && !error ? styles.inputOk : ""
  }`;

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <div className={styles.inputPasswordWrapper}>
        <input
          type={mostrar ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClass}
        />
        <span className={styles.togglePasswordIcon} onClick={toggleMostrar}>
          {mostrar ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {showError && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
