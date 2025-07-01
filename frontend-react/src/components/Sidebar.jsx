export default function Sidebar({ onSeleccion }) {
  return (
    <aside className="sidebar">
      <ul>
        <li onClick={() => onSeleccion("pedidos")}>Mis Pedidos</li>
        <li onClick={() => onSeleccion("config")}>Configuración</li>
        <li onClick={() => onSeleccion("cerrar")}>Cerrar Sesión</li>
      </ul>
    </aside>
  );
}
