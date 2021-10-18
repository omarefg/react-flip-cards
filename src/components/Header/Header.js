import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        React Flip Cards
      </Link>
    </header>
  );
}
