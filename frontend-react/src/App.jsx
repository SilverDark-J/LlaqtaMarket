import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductosPage from "./pages/auth/ProductosPage";
import IndexPage from "./pages/auth/IndexPage";
import ProductoDetallePage from "./pages/auth/Producto_DetallePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/producto_detalle" element={<ProductoDetallePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
