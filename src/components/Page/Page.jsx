import React from "react";
import styles from "./Page.module.css";
import { Children } from "react";
import Navbar from "../../components/Navbar/Navbar";

export default function Page({ children }) {
  return (
    <>
      <Navbar />
      <div className={styles["page"]}>
        {Children.map(children, (child) => (
          <>{child}</>
        ))}
      </div>
    </>
  );
}
