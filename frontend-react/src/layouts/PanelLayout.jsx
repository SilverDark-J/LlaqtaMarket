import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../styles/panelAdmin.module.css";

export default function PanelLayout({
  children,
  nombreUsuario,
  onSeleccion,
  opciones,
  opcionActiva,
}) {
  return (
    <>
      <Header nombreUsuario={nombreUsuario} />
      <div className={styles.contenedor}>
        <Sidebar
          opciones={opciones}
          onSeleccion={onSeleccion}
          opcionActiva={opcionActiva}
        />
        <main id="contenidoPrincipal" className={styles.contenidoPrincipal}>
          {children}
        </main>
      </div>
    </>
  );
}