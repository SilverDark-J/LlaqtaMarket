import { useNavigate } from "react-router-dom";
import logo from "../assets/media/logo2.jpg";
import styles from "../styles/panelAdmin.module.css";

export default function Header({ nombreUsuario }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="/productos" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Logo" className={styles.logoImg} />
        </a>
        LlaqtaMarket
      </div>
      <div className={styles.nombreCliente}>Bienvenido, {nombreUsuario}</div>
      <button className={styles.cerrarSesion} onClick={() => navigate("/productos")}>
        X
      </button>
    </header>
  );
}