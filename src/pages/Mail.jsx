import React from "react";
import Page from "./Page/Page";
import LineChart from "../components/LineChart";
import styles from "./Mail.module.css";

export default function Mail() {
  return (
    <Page>
      <div className={styles["chart"]}>
        <LineChart />
      </div>
    </Page>
  );
}
