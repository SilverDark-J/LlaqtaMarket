// ✅ src/routes/PublicRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegistroClientePage from "../pages/auth/RegistroClientePage";
import RegistroEmprendedorPage from "../pages/auth/RegistroEmprendedorPage";
import IndexPage from "../pages/index/IndexPage";
import ProductosPage from "../pages/productos/ProductosPage";
import ProductoDetallePage from "../pages/productos/Producto_DetallePage";
import CarritoCliente from "../pages/carrito/CarritoCliente";
import PagoClientePage from "../pages/pago/PagoClientePage"; // ✅ nueva ruta

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/producto_detalle/:id" element={<ProductoDetallePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro_cliente" element={<RegistroClientePage />} />
      <Route
        path="/registro_emprendedor"
        element={<RegistroEmprendedorPage />}
      />
      <Route path="/carrito" element={<CarritoCliente />} />
      <Route path="/pago" element={<PagoClientePage />} />
    </Routes>
  );
}
