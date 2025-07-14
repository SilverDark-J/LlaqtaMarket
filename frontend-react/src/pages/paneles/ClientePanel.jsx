// src/pages/paneles/ClientePanel.jsx
import { useEffect, useState } from "react";
import PanelLayout from "../../layouts/PanelLayout";
import styles from "../../styles/panelCliente.module.css"; // ✅ Nuevo import
import MisPedidos from "./components/MisPedidos";
import ConfiguracionCliente from "./components/ConfiguracionCliente";

export default function ClientePanel() {
  const [seccion, setSeccion] = useState("pedidos");
  const [nombreCliente, setNombreCliente] = useState("Cliente");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:3000/api/clientes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.nombres) setNombreCliente(data.nombres);
      })
      .catch(() => {
        console.error("No se pudo obtener el cliente.");
      });
  }, []);

  const opcionesCliente = [
    { id: "pedidos", nombre: "Mis Pedidos" },
    { id: "config", nombre: "Configuración" },
    { id: "cerrar", nombre: "Cerrar Sesión" },
  ];

  const handleSeleccion = (opcion) => {
    if (opcion === "cerrar") {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      setSeccion(opcion);
    }
  };

  return (
    <div className={styles.panelClienteWrapper}>
      <PanelLayout
        nombreUsuario={nombreCliente}
        onSeleccion={handleSeleccion}
        opciones={opcionesCliente}
        opcionActiva={seccion}
      >
        {seccion === "pedidos" && <MisPedidos />}
        {seccion === "config" && <ConfiguracionCliente />}
      </PanelLayout>
    </div>
  );
}
