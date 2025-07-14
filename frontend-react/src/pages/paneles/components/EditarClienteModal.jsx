import { useState, useEffect } from "react";

export default function EditarClienteModal({ cliente, onClose, onGuardar }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    direccion: "",
    telefono: "",
  });

  const [verContrasenia, setVerContrasenia] = useState(false);

  useEffect(() => {
    if (cliente) {
      setForm({
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        correo: cliente.correo,
        contrasenia: "",
        direccion: cliente.direccion || "",
        telefono: cliente.telefono,
      });
    }
  }, [cliente]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...form, id_cliente: cliente.id_cliente });
  };

  if (!cliente) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Editar Cliente</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombres">Nombres:</label>
          <input
            id="nombres"
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            required
          />

          <label htmlFor="apellidos">Apellidos:</label>
          <input
            id="apellidos"
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">Correo:</label>
          <input
            id="correo"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="contrasenia">Contraseña:</label>
          <div className="input-password">
            <input
              id="contrasenia"
              name="contrasenia"
              type={verContrasenia ? "text" : "password"}
              placeholder="Dejar vacío si no se cambia"
              value={form.contrasenia}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setVerContrasenia(!verContrasenia)}
            >
              {verContrasenia ? "🙈" : "👁"}
            </button>
          </div>

          <label htmlFor="direccion">Dirección:</label>
          <input
            id="direccion"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
          />

          <label htmlFor="telefono">Teléfono:</label>
          <input
            id="telefono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
          />

          <div className="acciones-modal">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
