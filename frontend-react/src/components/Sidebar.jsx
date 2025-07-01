export default function Sidebar({ opciones = [], onSeleccion, opcionActiva }) {
  return (
    <aside className="sidebar">
      <ul>
        {opciones.map((opcion) => (
          <li
            key={opcion.id}
            className={opcionActiva === opcion.id ? "activo" : ""}
            onClick={() => onSeleccion(opcion.id)}
          >
            {opcion.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}
