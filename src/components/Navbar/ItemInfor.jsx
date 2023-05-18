import {AiOutlineHome} from "react-icons/ai";
import {MdAppRegistration,MdOutlineAnalytics} from "react-icons/md";
import { GoGraph } from "react-icons/go";
import styles from "./NavItem.module.css";

const items = [
  {
    path: "/home",
    icon: <AiOutlineHome className={styles["nav-icon"]} />,
    title: "Home",
  },
  {
    path: "/statistic",
    icon: <GoGraph className={styles["nav-icon"]} />,
    title: "Statistic",
  },
  {
    path: "/registration",
    icon: <MdAppRegistration className={styles["nav-icon"]} />,
    title: "Registration",
  },
  {
    path: "/prediction",
    icon: <MdOutlineAnalytics className={styles["nav-icon"]} />,
    title: "Prediction",
  },
];
export default items;
