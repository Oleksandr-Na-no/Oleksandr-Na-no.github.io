import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { beckEndServerUrl } from "../../../settings.ts";

function Header() {
  const { userLoggedIn } = useAuth();

  return (
    <header className={styles.topContainer}>
      <Link className={styles.LogoContainer} to="/">
        <img
          src={beckEndServerUrl + "/img/logo.svg"}
          alt="Logo"
          className={styles.logo}
        />
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
        {userLoggedIn ? (
          <Link className={styles.link} to="/profile">
            Профіль
          </Link>
        ) : (
          <Link className={styles.loginButton} to="/login">
            Увійти
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
