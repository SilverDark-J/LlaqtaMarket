// src/components/PublicFooter.jsx
import styles from "../styles/publicFooter.module.css";

export default function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="#">Acerca de nosotros</a>
        <a href="#">Términos y condiciones</a>
        <a href="#">Redes Sociales</a>
      </div>
    </footer>
  );
}
