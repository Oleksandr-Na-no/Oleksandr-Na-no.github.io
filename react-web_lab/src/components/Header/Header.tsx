import styles from "./Header.module.css";
import {Link} from "react-router-dom";

function Header() {
  return (
    <header className={styles.topContainer}>
      <Link className={styles.LogoContainer} to="/">
        <img src="/assets/logo.svg" alt="Logo" className={styles.logo} />
        <h1 className={styles.BrandName}>Pohotooo</h1>
      </Link>
      <nav className={styles.TopMenu}>
        <Link className={styles.link} to="/lessons">
          Уроки
        </Link>
        <Link className={styles.link} to="/gallery">
          Галерея
        </Link>
        <Link className={styles.link} to="/progress">
          Мій прогрес
        </Link>
      </nav>
    </header>
  );
}

export default Header;
