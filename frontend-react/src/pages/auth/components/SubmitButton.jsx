// src/pages/auth/components/SubmitButton.jsx
import React from "react";

export default function SubmitButton({ texto, loading, ...props }) {
  return (
    <button type="submit" disabled={loading} {...props}>
      {loading ? "Procesando..." : texto}
    </button>
  );
}
