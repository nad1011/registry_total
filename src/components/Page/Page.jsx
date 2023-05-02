import React from "react";
import styles from "./Page.module.css";
import { Children } from "react";

export default function Page({ children }) {
  return (
    <div className={styles["page"]}>
      {Children.map(children, (child) => (
        <>{child}</>
      ))}
    </div>
  );
}
