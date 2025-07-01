import HeaderCliente from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function PanelLayout({
  children,
  nombreUsuario,
  onSeleccion,
  opciones,
  opcionActiva,
}) {
  return (
    <>
      <HeaderCliente nombre={nombreUsuario} />
      <div className="contenedor">
        <Sidebar
          opciones={opciones}
          onSeleccion={onSeleccion}
          opcionActiva={opcionActiva}
        />
        <main id="contenidoPrincipal">{children}</main>
      </div>
    </>
  );
}
