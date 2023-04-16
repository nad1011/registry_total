import { Link } from "react-router-dom";
import styles from "./NavItem.module.css";

function NavItem({ item, index, activeIndex, setActiveIndex }) {
  const isActive = activeIndex === index;

  function handleClick() {
    setActiveIndex(index);
  }

  return (
    <li
      key={index}
      className={`${styles["nav-item"]} ${
        isActive ? styles.active : ""
      }`}
      onClick={handleClick}
    >
      <Link to={item.path}>
        {item.icon}
        <span className={styles["nav-title"]}>{item.title}</span>
      </Link>
    </li>
  );
}


export default NavItem;
