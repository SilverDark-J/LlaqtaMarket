// ✅ src/components/auth/FormInput.jsx
import React from "react";
import styles from "./styles/authInputs.module.css";

export default function FormInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
}) {
  const showError = touched && error;
  const inputClass = `${styles.input} ${
    showError ? styles.inputError : value && !error ? styles.inputOk : ""
  }`;

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={inputClass}
      />
      {showError && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
