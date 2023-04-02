import * as AiIcon from "react-icons/ai";
import * as BsIcon from "react-icons/bs";
import styles from "./NavItem.module.css";

const items = [
  {
    cName: "",
    path: "/shop",
    icon: <AiIcon.AiOutlineShoppingCart className={styles["nav-icon"]}/>,
    title: "Shop",
  },
  {
    cName: "",
    path: "/mail",
    icon: <BsIcon.BsMailbox className={styles["nav-icon"]}/>,
    title: "Mail",
  },
  {
    cName: "",
    path: "/check",
    icon: <BsIcon.BsFillCalendar2CheckFill className={styles["nav-icon"]}/>,
    title: "Check",
  },
  {
    cName: "",
    path: "/auth",
    icon: <BsIcon.BsFillCalendar2CheckFill className={styles["nav-icon"]}/>,
    title: "Sign-in",
  },
];
export default items;
