// src/components/PublicHeader.jsx
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/publicHeader.module.css";
import logo from "../assets/media/logo2.jpg";
import iconoPerfil from "../assets/media/I.png";
import iconoCarrito from "../assets/media/carrito.png";
import { useState } from "react";

const categorias = [
  "Ropa",
  "Calzado",
  "Electrónica",
  "Hogar",
  "Juguetería",
  "Belleza",
  "Deportes",
  "Libros",
];

export default function PublicHeader({ mostrarCategorias = false, onBuscar }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const filtrarPorCategoria = (cat) => {
    navigate(`/productos?categoria=${encodeURIComponent(cat)}`);
  };

  const handleBuscar = (e) => {
    const value = e.target.value;
    setBusqueda(value);
    if (onBuscar) onBuscar(value); // comunica al padre
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContenido}>
        <div className={styles.headerIzquierda}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" className={styles.logoImg} />
            </Link>
            LlaqtaMarket
          </div>

          <div className={styles.menuContainer}>
            {mostrarCategorias && (
              <>
                <button onClick={() => setMostrarMenu(!mostrarMenu)} className={styles.menuBtn}>
                  Menú
                </button>
                <div
                  className={styles.menuOpciones}
                  style={{ display: mostrarMenu ? "flex" : "none" }}
                >
                  {categorias.map((cat, i) => (
                    <a href="#" key={i} onClick={() => filtrarPorCategoria(cat)}>
                      {cat}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.buscador}>
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={busqueda}
              onChange={handleBuscar}
            />
          </div>
        </div>

        <div className={styles.acciones}>
          <Link to="/login" className={styles.perfil}>
            <img src={iconoPerfil} alt="Perfil" className={styles.icono} />
            <p>Iniciar Sesión</p>
          </Link>
          <Link to="/productos" className={styles.carrito}>
            <img src={iconoCarrito} alt="Carrito" className={styles.icono} />
            <p>Carrito</p>
          </Link>
        </div>
      </div>
    </header>
  );
}
