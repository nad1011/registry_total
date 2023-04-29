import React from "react";
import Page from "../Page/Page";
import LineChart from "../../components/LineChart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dropdown from "../../components/Dropdown";
import Switch from "../../components/Switch";
import Table from "../../components/Table";
import {
  getRegistrationDate,
  getExpirationDate,
  getRegistrationInfo,
} from "../../firebase/firebase";
import { useState, useEffect } from "react";
import ToggleSwitch from "../../components/TripleToggleSwitch/TripleToggleSwitch";

export default function Statistic() {
  // data de truyen vao line graph
  const [data, setData] = useState([
    {
      id: "statistic",
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

  const [tableData, setTableData] = useState([]);
  // list data from database
  const [currentList, setCurrentList] = useState([]);
  const [expiredList, setExpiredList] = useState([]);
  const [list, setList] = useState([]);

  const [viewOption, setViewOption] = useState("Tháng");
  const [expiredView, setExpiredView] = useState();

  // useEffect(() => {
  //   const getNewData = async () => {
  //     const newCurrentList = await getRegistrationDate();
  //     setCurrentList(newCurrentList);
  //     const newExpiredList = await getExpirationDate();
  //     setExpiredList(newExpiredList);
  //   };

  //   getNewData();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const newData = await getRegistrationInfo();
      setTableData(newData);
      // console.log(newData);
    };
    getData();
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
      // 2024: 0,
      // 2025: 0,
      // 2026: 0,
      // 2027: 0,
    };
    list.forEach((date) => {
      const year = date.split("-")[0];
      if (listSortByYear[year]) {
        listSortByYear[year]++;
      } else {
        listSortByYear[year] = 1;
      }
    });
    // console.log("listSortByYear", listSortByYear);
    return listSortByYear;
  };

  const sortByQuarter = () => {
    const listSortByQuarter = {
      "2014-Q1": 0,
      "2014-Q2": 0,
      "2014-Q3": 0,
      "2014-Q4": 0,
      "2015-Q1": 0,
      "2015-Q2": 0,
      "2015-Q3": 0,
      "2015-Q4": 0,
      "2016-Q1": 0,
      "2016-Q2": 0,
    };

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
    // console.log("listSortByQuarter", listSortByQuarter);
    return listSortByQuarter;
  };

  const sortByMonth = () => {
    const listSortByMonth = {
      "01/2014": 0,
      "02/2014": 0,
      "03/2014": 0,
      "04/2014": 0,
      "05/2014": 0,
      "06/2014": 0,
      "07/2014": 0,
      "08/2014": 0,
      "09/2014": 0,
      "10/2014": 0,
    };

    list.forEach((date) => {
      const monthAndYear = date.split("-")[0] + "/" + date.split("-")[1];
      // console.log("monthAndYear: " + monthAndYear);
      if (listSortByMonth[monthAndYear]) {
        listSortByMonth[monthAndYear]++;
      } else {
        listSortByMonth[monthAndYear] = 1;
      }
    });

    return listSortByMonth;
  };

  const handle = () => {
    let sortedList = {};
    switch (viewOption) {
      case "Năm": {
        const tmpList = sortByYear();
        // console.log("sortedList", sortedList);
        const tmpArr = Object.entries(tmpList);

        tmpArr.sort((a, b) => {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        });
        sortedList = Object.fromEntries(tmpArr);
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
    let start = keyArray.length - 10;
    if (expiredView) {
      start = 0;
    }

    const newData = data.map((item) => ({
      ...item,
      data: item.data.map((value, index) => {
        return {
          x: keyArray[start + index],
          y: sortedList[keyArray[start + index]],
        };
      }),
    }));

    setData(newData);
    // console.log("sortList", sortedList);
    // setTableData(newData[0].data);
  };

  const onChangeDropdown = (data) => {
    setViewOption(data);
  };

  useEffect(() => {
    if (!expiredView) {
      setList(currentList);
    } else {
      setList(expiredList);
    }

    handle();
  }, [viewOption, list, expiredView]);

  const getToggleValue = (value) => {
    setExpiredView(value);
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
            <ToggleSwitch
              values={["Tháng", "Quý", "Năm"]}
              selected={viewOption}
              onChange={onChangeDropdown}
              changeGraph={handle}
            />
            {/* <Dropdown transfer={onChangeDropdown} changeGraph={handle} /> */}
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
            <Switch onSwitch={getToggleValue} />
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
            <Table data={tableData} />
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}
