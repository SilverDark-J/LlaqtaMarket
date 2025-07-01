import { useNavigate } from "react-router-dom";
import logo from "../assets/media/logo2.jpg";

export default function Header({ nombreUsuario }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <a href="/productos" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Logo" className="logo-img" />
        </a>
        LlaqtaMarket
      </div>
      <div className="nombre-cliente">Bienvenido, {nombreUsuario}</div>
      <button className="ir-productos" onClick={() => navigate("/productos")}>
        X
      </button>
    </header>
  );
}
