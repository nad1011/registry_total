import React from "react";
import { AiFillCar } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import NavItem from "./NavItem";
import items from "./ItemInfor";
import styles from "./Navbar.module.css";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className={`${styles["nav-bar"]} ${sidebar ? styles.active : ""}`}>
      <Stack direction="row" spacing={0.5} className={styles["logo-bar"]} onClick={showSidebar}>
        <AiFillCar className={styles["logo-icon"]}/>
        <span className={styles["logo-title"]}>RegistryTotal</span>
      </Stack>
      <ul className={styles["nav-menu-item"]}>
        {items.map((item, index) => {
          return (
            <NavItem
              key={index}
              index={index}
              item={item}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          );
        })}
      </ul>
      <Stack direction="row" spacing={2} className={styles["logout-bar"]}>
        <Avatar alt="TT1" className={styles["avatar"]}/>
        <span className={styles["avatar-name"]}>Trung tâm 1</span>
        <BiLogOut className={styles["logout-icon"]}/>
      </Stack>
    </div>
  );
}

export default Navbar;
