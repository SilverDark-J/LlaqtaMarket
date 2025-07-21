import styles from "../../../styles/panelAdmin.module.css";

export default function Sidebar({ opciones = [], onSeleccion, opcionActiva }) {
  return (
    <aside className={styles.sidebar}>
      <ul>
        {opciones.map((opcion) => (
          <li
            key={opcion.id}
            className={opcionActiva === opcion.id ? styles.activo : ""}
            onClick={() => onSeleccion(opcion.id)}
          >
            {opcion.nombre}
          </li>
        ))}
      </ul>
    </aside>
  );
}
