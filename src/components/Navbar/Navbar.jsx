import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import NavItem from "./NavItem";
import items from "./ItemInfor";
import styles from "./Navbar.module.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className={styles.navbar}>
        <Link to="#" className={styles["menu-bar"]}>
          <FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? `${styles["nav-menu"]} ${styles["active"]}` : styles["nav-menu"]}>
        <ul className={styles["nav-menu-item"]}>
          <li className={styles["nav-toggle"]}>
            <Link to="#" className={styles["menu-bar"]}>
              <AiOutlineClose onClick={showSidebar} />
            </Link>
          </li>
          {items.map((item, index) => {
            return <NavItem key={index} index={index} item={item} />;
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
