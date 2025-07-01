// layouts/PanelLayout.jsx

import HeaderCliente from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function PanelLayout({
  children,
  nombreUsuario,
  onSeleccion,
  opcionesSidebar,
  seccionActual,
}) {
  return (
    <>
      <HeaderCliente nombre={nombreUsuario} />
      <div className="contenedor">
        <Sidebar
          opciones={opcionesSidebar}
          onSeleccion={onSeleccion}
          opcionActiva={seccionActual}
        />
        <main id="contenidoPrincipal">{children}</main>
      </div>
    </>
  );
}
