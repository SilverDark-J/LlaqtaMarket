// ✅ src/pages/pago/PagoClientePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { realizarPedido } from "../../services/pedidoService";
import styles from "../../styles/pagoCliente.module.css";
import PublicHeader from "../../components/PublicHeader";
import PublicFooter from "../../components/PublicFooter";

export default function PagoClientePage() {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    correo: "",
    tarjeta: "",
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");
    setError("");
    try {
      await realizarPedido(formData);
      setMensaje("✅ Pedido realizado exitosamente");
      setTimeout(() => navigate("/panel/cliente"), 1500);
    } catch (err) {
      setError("❌ Error al procesar el pedido");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.pagoWrapper}>
      <PublicHeader />

      <div className={styles.formularioPago}>
        <h2 className={styles.titulo}>Formulario de Pago</h2>
        <form onSubmit={handleSubmit}>
          {["nombre", "dni", "telefono", "correo", "tarjeta"].map((campo) => (
            <div className={styles.inputGroup} key={campo}>
              <label htmlFor={campo}>
                {campo === "tarjeta"
                  ? "Número de Tarjeta (simulado)"
                  : campo.charAt(0).toUpperCase() + campo.slice(1)}
              </label>
              <input
                id={campo}
                type={campo === "correo" ? "email" : "text"}
                name={campo}
                value={formData[campo]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className={styles.botonPagar}
            disabled={cargando}
          >
            {cargando ? "Procesando..." : "Pagar y confirmar pedido"}
          </button>

          {mensaje && <div className={styles.mensajeExito}>{mensaje}</div>}
          {error && <div className={styles.mensajeError}>{error}</div>}
        </form>
      </div>

      <PublicFooter />
    </div>
  );
}
