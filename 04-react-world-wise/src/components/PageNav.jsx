import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink className={styles.link} to={"/"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to={"/product"}>
            Product
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to={"/pricing"}>
            Pricing
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
