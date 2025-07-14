import { useEffect, useState } from "react";
import {
  obtenerClientes,
  bloquearUsuario,
  actualizarCliente,
} from "../../../services/adminService";
import EditarClienteModal from "./EditarClienteModal";

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerClientes();
        setClientes(data || []);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
        alert("No se pudo cargar la lista de clientes.");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const handleBloquear = async (id_usuario) => {
    try {
      await bloquearUsuario(id_usuario);
      alert("Cliente bloqueado correctamente");
      setClientes((prev) => prev.filter((c) => c.id_usuario !== id_usuario));
    } catch (error) {
      console.error("Error al bloquear cliente:", error);
      alert("Error al bloquear el cliente.");
    }
  };

  const handleEditar = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const handleGuardar = async (datosActualizados) => {
    try {
      const actualizado = await actualizarCliente(datosActualizados);
      setClientes((prev) =>
        prev.map((c) =>
          c.id_cliente === actualizado.id_cliente ? actualizado : c
        )
      );
      setClienteSeleccionado(null);
      alert("Cliente actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      alert("No se pudo actualizar el cliente.");
    }
  };

  return (
    <section>
      <h2>Gestión de Clientes</h2>

      {cargando ? (
        <p>Cargando clientes...</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID Cliente</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente}>
                <td>{c.id_cliente}</td>
                <td>{c.nombres}</td>
                <td>{c.apellidos}</td>
                <td>{c.correo}</td>
                <td>{c.telefono}</td>
                <td>{new Date(c.fecha_registro).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleEditar(c)}>Editar</button>
                    <button onClick={() => handleBloquear(c.id_usuario)}>
                      Bloquear
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {clienteSeleccionado && (
        <EditarClienteModal
          cliente={clienteSeleccionado}
          onClose={() => setClienteSeleccionado(null)}
          onGuardar={handleGuardar}
        />
      )}
    </section>
  );
}
