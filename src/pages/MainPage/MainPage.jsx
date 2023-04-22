import { useState } from "react";
import Statistic from "./Statistic";
import data from "./Data";

export default function MainPage() {
  const [dateData, setDateData] = useState(
    data
      .map((datum) => datum.registrationDate)
      .sort()
      .map((date) => {
        return {
          month: Number(date.substring(3, 5)),
          quarter: parseInt((Number(date.substring(3, 5)) - 1) / 3) + 1,
          year: Number(date.substring(6)),
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        if (a.quarter !== b.quarter) return b.quarter - a.quarter;
        return b.month - a.month;
      })
  );
  return (
    <>
      <Statistic
        title={"Năm " + dateData[0].year}
        number={
          dateData.filter((date) => date.year === dateData[0].year).length
        }
      />
      <Statistic
        title={"Quý " + dateData[0].quarter}
        number={
          dateData.filter(
            (date) =>
              date.year === dateData[0].year &&
              date.quarter === dateData[0].quarter
          ).length
        }
      />
      <Statistic
        title={"Tháng " + dateData[0].month}
        number={
          dateData.filter(
            (date) =>
              date.year === dateData[0].year && date.month === dateData[0].month
          ).length
        }
      />
    </>
  );
}
