import { Link } from "react-router-dom";
import styles from "./NavItem.module.css";

function NavItem({ index, item }) {
  return (
    <li key={index} className={styles["nav-item"]}>
      <Link to={item.path}>
        {item.icon}
        {/* <span>{item.title}</span> */}
      </Link>
    </li>
  );
}

export default NavItem;
