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

// var tableData = [];

export default function Mail() {
  // data de truyen vao line graph
  const [data, setData] = useState([]);
  // list data from database
  const [list, setList] = useState([]);
  const [viewOption, setViewOption] = useState("Năm");

  useEffect(() => {
    const getNewData = async () => {
      const newList = await getRegistrationDate();
      setList(newList);
      // console.log(list);
    };

    getNewData();
    setData([
      {
        id: "japan",
        color: "hsl(62, 70%, 50%)",
        data: [
          {
            x: "2014",
            y: 0,
          },
          {
            x: "2015",
            y: 0,
          },
          {
            x: "2016",
            y: 0,
          },
          {
            x: "2017",
            y: 0,
          },
          {
            x: "2018",
            y: 0,
          },
          {
            x: "2019",
            y: 0,
          },
          {
            x: "2020",
            y: 0,
          },
          {
            x: "2021",
            y: 0,
          },
          {
            x: "2022",
            y: 0,
          },
          {
            x: "2023",
            y: 0,
          },
        ],
      },
    ]);
    // tableData = data;
    // console.log("1", tableData);
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
    console.log("listSortByYear", listSortByYear);
    return listSortByYear;
  };

  const sortByQuarter = () => {
    const listSortByQuarter = {};

    list.forEach((date) => {
      const [year, month, day] = date.split("-");
      const quarter = Math.floor((parseInt(month, 10) - 1) / 3) + 1;
      const quarterKey = `${year}-Q${quarter}`;

      if (listSortByQuarter[quarterKey]) {
        listSortByQuarter[quarterKey]++;
      } else {
        listSortByQuarter[quarterKey] = 1;
      }
    });
    console.log("listSortByQuarter", listSortByQuarter);
    return listSortByQuarter;
  };

  const sortByMonth = () => {
    const listSortByMonth = {};

    list.forEach((date) => {
      const monthAndYear = date.split("-")[0] + "/" + date.split("-")[1];
      // console.log("monthAndYear: " + monthAndYear);
      if (listSortByMonth[monthAndYear]) {
        listSortByMonth[monthAndYear]++;
      } else {
        listSortByMonth[monthAndYear] = 1;
      }
    });
    console.log("listSortByMonth", listSortByMonth);
    // console.log(listSortByYear);
    return listSortByMonth;
  };

  const handle = () => {
    let sortedList = {};
    switch (viewOption) {
      case "Năm": {
        sortedList = sortByYear();
        // console.log("sortedList", sortedList);
        break;
      }

      case "Tháng": {
        const tmpList = sortByMonth();

        const tmpArr = Object.entries(tmpList);

        tmpArr.sort((a, b) => {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        });
        sortedList = Object.fromEntries(tmpArr);
        break;
      }

      case "Quý": {
        const tmpList = sortByQuarter();

        const tmpArr = Object.entries(tmpList);

        tmpArr.sort((a, b) => {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        });

        sortedList = Object.fromEntries(tmpArr);
        break;
      }
      default:
        return new Error("Invalid viewOption");
    }

    const keyArray = Object.keys(sortedList);
    const start = keyArray.length - 10;
    const newData = data.map((item) => ({
      ...item,
      data: item.data.map((value, index) => {
        return {
          x: keyArray[start + index],
          y: sortedList[keyArray[index]],
        };
      }),
    }));
    // console.log(viewOption);
    setData(newData);
    // tableData = data;
    // console.log("2", tableData);
    // console.log("data in mail", data);
  };
  //
  const onChangeDropdown = (data) => {
    setViewOption(data);
  };

  return (
    <Page>
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
// export { tableData };
