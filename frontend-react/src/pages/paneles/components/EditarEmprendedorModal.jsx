import { useState, useEffect } from "react";

export default function EditarEmprendedorModal({
  emprendedor,
  onClose,
  onGuardar,
}) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    direccion: "",
    telefono: "",
    descripcion: "",
    nombre_emprendimiento: "",
  });

  const [verContrasenia, setVerContrasenia] = useState(false);

  useEffect(() => {
    if (emprendedor) {
      setForm({
        nombres: emprendedor.nombres,
        apellidos: emprendedor.apellidos,
        correo: emprendedor.correo,
        contrasenia: "",
        direccion: emprendedor.direccion || "",
        telefono: emprendedor.telefono,
        descripcion: emprendedor.descripcion || "",
        nombre_emprendimiento: emprendedor.nombre_emprendimiento,
      });
    }
  }, [emprendedor]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...form, id_emprendedor: emprendedor.id_emprendedor });
  };

  if (!emprendedor) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Editar Emprendedor</h3>
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

          <label htmlFor="nombre_emprendimiento">
            Nombre del emprendimiento:
          </label>
          <input
            id="nombre_emprendimiento"
            name="nombre_emprendimiento"
            value={form.nombre_emprendimiento}
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

          <label htmlFor="telefono">Teléfono:</label>
          <input
            id="telefono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
          />

          <label htmlFor="direccion">Dirección:</label>
          <input
            id="direccion"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
          />

          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
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
