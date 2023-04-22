import React from "react";
import Page from "./Page/Page";
import LineChart from "../components/LineChart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dropdown from "../components/Dropdown";
import Switch from "../components/Switch";
import Table from "../components/Table";
import { getRegistrationDate } from "../utils/firebase.utils";

import { useState, useEffect } from "react";

export default function Mail() {
  //
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [viewOption, setViewOption] = useState("Năm");

  useEffect(() => {
    const getNewData = async () => {
      const newList = await getRegistrationDate();
      setList(newList);
    };

    getNewData();
    setData([
      {
        id: "japan",
        color: "hsl(62, 70%, 50%)",
        data: [
          {
            x: "2014",
            y: 211,
          },
          {
            x: "2015",
            y: 222,
          },
          {
            x: "2016",
            y: 108,
          },
          {
            x: "2017",
            y: 133,
          },
          {
            x: "2018",
            y: 281,
          },
          {
            x: "2019",
            y: 190,
          },
          {
            x: "2020",
            y: 202,
          },
          {
            x: "2021",
            y: 187,
          },
          {
            x: "2022",
            y: 181,
          },
          {
            x: "2023",
            y: 191,
          },
        ],
      },
    ]);
  }, []);

  const sortByYear = () => {
    const listSortByYear = {
      2014: 0,
      2015: 0,
      2016: 0,
      2017: 0,
      2018: 0,
      2019: 0,
      2020: 0,
      2021: 0,
      2022: 0,
      2023: 0,
    };
    list.forEach((date) => {
      const year = date.split("-")[0];
      if (listSortByYear[year]) {
        listSortByYear[year]++;
      } else {
        listSortByYear[year] = 1;
      }
    });
    // console.log(listSortByYear);
    return listSortByYear;
  };

  const sortByMonthAndYear = () => {
    const listSortByMonthAndYear = {};

    list.forEach((date) => {
      const monthAndYear = date.split("-")[0] + "/" + date.split("-")[1];
      // console.log("monthAndYear: " + monthAndYear);
      if (listSortByMonthAndYear[monthAndYear]) {
        listSortByMonthAndYear[monthAndYear]++;
      } else {
        listSortByMonthAndYear[monthAndYear] = 1;
      }
    });
    console.log(listSortByMonthAndYear);
    // console.log(listSortByYear);
    return listSortByMonthAndYear;
  };

  const handle = () => {
    let sortedList = {};
    if (viewOption === "Năm") {
      sortedList = sortByYear();
      console.log("sortedList", sortedList);
    } else if (viewOption === "Tháng") {
      console.log("Lọc theo:", viewOption);
    }
    const newData = data.map((item) => ({
      ...item,
      data: item.data.map((value) => {
        // console.log(value.x);

        return {
          ...value,
          y: sortedList[value.x],
        };
      }),
    }));
    // console.log(sortedList);
    console.log("ver1", newData);
    console.log(viewOption);
    setData(newData);
  };
  //
  const onChangeDropdown = (data) => {
    setViewOption(data);
    console.log("viewOption", viewOption);
  };

  return (
    <Page>
      <button onClick={sortByMonthAndYear}>ok</button>
      <Grid container justifyContent="center" spacing={2} height={1}>
        <Grid
          container
          item
          justifyContent="flex-start"
          alignItems="center"
          xs={8}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
            }}
          >
            <Dropdown tranfer={onChangeDropdown} changeGraph={handle} />
          </Box>
        </Grid>
        <Grid
          container
          item
          justifyContent="flex-end"
          alignItems="center"
          xs={4}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
            }}
          >
            <Switch />
          </Box>
        </Grid>
        <Grid container item justifyContent="center" height={0.5}>
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
              width: 0.7,
              height: 1.0,
            }}
          >
            <LineChart viewOption={viewOption} data={data} />
          </Box>
        </Grid>
        <Grid container item justifyContent="center" height={0.4}>
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: 1,
              borderRadius: 2,
              pl: 1,
              pr: 1,
              width: 0.7,
              height: 1.0,
            }}
          >
            <Table />
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
