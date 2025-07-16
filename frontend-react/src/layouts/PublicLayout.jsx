// src/layouts/PublicLayout.jsx
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";
import styles from "../styles/publicLayout.module.css";

export default function PublicLayout({ children }) {
  return (
    <div className={styles.layout}>
      <PublicHeader mostrarCategorias={true} />
      <main className={styles.main}>{children}</main>
      <PublicFooter />
    </div>
  );
}
