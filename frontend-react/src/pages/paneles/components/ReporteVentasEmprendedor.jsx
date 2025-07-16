import { useState, useEffect } from "react";
import styles from "../../../styles/reporteVentas.module.css";
import {
  obtenerMasVendidos,
  obtenerSinVentas,
  obtenerTotalGenerado,
  obtenerCantidadPedidos,
  obtenerVentasPorMes,
} from "../../../services/reporteService";
import { useAuth } from "../../../context/AuthContext";

export default function ReporteVentasEmprendedor() {
  const { token } = useAuth();
  const [tipoReporte, setTipoReporte] = useState("masVendidos");
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      let resultado = [];
      switch (tipoReporte) {
        case "masVendidos":
          resultado = await obtenerMasVendidos(token);
          break;
        case "sinVentas":
          resultado = await obtenerSinVentas(token);
          break;
        case "totalGenerado":
          resultado = await obtenerTotalGenerado(token);
          break;
        case "cantidadPedidos":
          resultado = await obtenerCantidadPedidos(token);
          break;
        case "ventasMes":
          resultado = await obtenerVentasPorMes(token);
          break;
        default:
          break;
      }
      setDatos(resultado);
    } catch (error) {
      console.error("Error cargando reporte:", error);
      alert("❌ Error al obtener reporte");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [tipoReporte]);

  const renderTabla = () => {
    if (tipoReporte === "cantidadPedidos") {
      return (
        <p className={styles.reporteContainer}>
          Total de pedidos con tus productos:{" "}
          <strong>{datos[0]?.cantidad_pedidos ?? 0}</strong>
        </p>
      );
    }

    if (datos.length === 0) return <p>No hay datos para mostrar.</p>;

    return (
      <table className={styles.tablaReporte}>
        <thead>
          <tr>
            {Object.keys(datos[0]).map((key) => (
              <th key={key}>{key.replace(/_/g, " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, idx) => (
            <tr key={idx}>
              {Object.values(fila).map((valor, i) => (
                <td key={i}>{valor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.reporteContainer}>
      <h2>📊 Reportes de Ventas</h2>
      <select
        className={styles.selectReporte}
        value={tipoReporte}
        onChange={(e) => setTipoReporte(e.target.value)}
      >
        <option value="masVendidos">Productos más vendidos</option>
        <option value="sinVentas">Productos sin ventas</option>
        <option value="totalGenerado">Total generado por producto</option>
        <option value="cantidadPedidos">Cantidad de pedidos</option>
        <option value="ventasMes">Ventas por mes</option>
      </select>

      {cargando ? <p>Cargando reporte...</p> : renderTabla()}
    </div>
  );
}
