import { useEffect, useState } from "react";
import {
  obtenerEmprendedores,
  bloquearUsuario,
  actualizarEmprendedor,
} from "../../../services/adminService";
import EditarEmprendedorModal from "./EditarEmprendedorModal";

export default function ListaEmprendedores() {
  const [emprendedores, setEmprendedores] = useState([]);
  const [emprendedorSeleccionado, setEmprendedorSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerEmprendedores();
        setEmprendedores(data || []);
      } catch (error) {
        console.error("Error al cargar emprendedores:", error);
        alert("No se pudo cargar la lista de emprendedores.");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const handleBloquear = async (id_usuario) => {
    try {
      await bloquearUsuario(id_usuario);
      alert("Emprendedor bloqueado correctamente");
      setEmprendedores((prev) =>
        prev.filter((e) => e.id_usuario !== id_usuario)
      );
    } catch (error) {
      console.error("Error al bloquear emprendedor:", error);
      alert("Error al bloquear el emprendedor.");
    }
  };

  const handleEditar = (emprendedor) => {
    setEmprendedorSeleccionado(emprendedor);
  };

  const handleGuardar = async (datosActualizados) => {
    try {
      const actualizado = await actualizarEmprendedor(datosActualizados);
      setEmprendedores((prev) =>
        prev.map((e) =>
          e.id_emprendedor === actualizado.id_emprendedor ? actualizado : e
        )
      );
      setEmprendedorSeleccionado(null);
      alert("Emprendedor actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar emprendedor:", error);
      alert("No se pudo actualizar el emprendedor.");
    }
  };

  return (
    <section>
      <h2>Gestión de Emprendedores</h2>

      {cargando ? (
        <p>Cargando emprendedores...</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID Emprendedor</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Emprendimiento</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {emprendedores.map((e) => (
              <tr key={e.id_emprendedor}>
                <td>{e.id_emprendedor}</td>
                <td>{e.nombres}</td>
                <td>{e.apellidos}</td>
                <td>{e.nombre_emprendimiento}</td>
                <td>{e.correo}</td>
                <td>{e.telefono}</td>
                <td>{new Date(e.fecha_registro).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleEditar(e)}>Editar</button>
                    <button onClick={() => handleBloquear(e.id_usuario)}>
                      Bloquear
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {emprendedorSeleccionado && (
        <EditarEmprendedorModal
          emprendedor={emprendedorSeleccionado}
          onClose={() => setEmprendedorSeleccionado(null)}
          onGuardar={handleGuardar}
        />
      )}
    </section>
  );
}
