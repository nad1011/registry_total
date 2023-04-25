import * as AiIcon from "react-icons/ai";
import * as MdIcon from "react-icons/md";
import { GoGraph } from "react-icons/go";
import styles from "./NavItem.module.css";

const items = [
  {
    path: "/home",
    icon: <AiIcon.AiOutlineHome className={styles["nav-icon"]} />,
    title: "Home",
  },
  {
    path: "/statistic",
    icon: <GoGraph className={styles["nav-icon"]} />,
    title: "Statistic",
  },
  {
    path: "/registration",
    icon: <MdIcon.MdAppRegistration className={styles["nav-icon"]} />,
    title: "Registration",
  },
  {
    path: "/prediction",
    icon: <MdIcon.MdOutlineAnalytics className={styles["nav-icon"]} />,
    title: "Prediction",
  },
];
export default items;
