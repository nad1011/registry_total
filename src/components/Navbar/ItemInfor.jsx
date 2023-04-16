import * as AiIcon from "react-icons/ai";
import * as MdIcon from "react-icons/md";
import {GoGraph} from "react-icons/go";
import styles from "./NavItem.module.css";

const items = [
  {
    cName: "",
    path: "/shop",
    icon: <AiIcon.AiOutlineHome className={styles["nav-icon"]}/>,
    title: "Shop",
  },
  {
    cName: "",
    path: "/mail",
    icon: <GoGraph className={styles["nav-icon"]}/>,
    title: "Mail",
  },
  {
    cName: "",
    path: "/",
    icon: <MdIcon.MdAppRegistration className={styles["nav-icon"]}/>,
    title: "Check",
  },
  {
    cName: "",
    path: "/auth",
    icon: <MdIcon.MdOutlineAnalytics className={styles["nav-icon"]}/>,
    title: "Sign-in",
  },
];
export default items;
