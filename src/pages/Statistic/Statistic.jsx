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
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

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

  useEffect(() => {
    const getNewData = async () => {
      const newCurrentList = await getRegistrationDate();
      setCurrentList(newCurrentList);
      const newExpiredList = await getExpirationDate();
      setExpiredList(newExpiredList);
    };

    getNewData();
  }, []);

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
      <Grid container justifyContent="center" spacing={0} height={1}>
        <Grid item justifyContent="center" height="100%" xs={8}>
          <Stack
            spacing={{ xs: 0, sm: 0 }}
            sx={{ m: "2%", height: "97%", mb: 0 }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                p: 2,
                pt: 1,
                mb: 0,
                width: 1,
                height: 0.07,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Raleway",
                    fontSize: 25,
                    color: "#000",
                  }}
                >
                  Statistic
                </Typography>
                <Switch onSwitch={getToggleValue} />
              </Stack>
            </Box>
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                p: 1,
                pt: 0,
                mb: 2,
                width: 1,
                height: 0.5,
              }}
            >
              <LineChart viewOption={viewOption} data={data} />
            </Box>
            <Stack direction="row" sx={{ height: 0.39, mt: "2% !important" }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  p: 1,
                  width: 0.5,
                  height: 1,
                  mr: "2% !important",
                }}
              ></Box>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  p: 1,
                  width: 0.5,
                  height: 1,
                }}
              ></Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item justifyContent="center" height="100%" xs={4}>
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 0, sm: 0 }}
            sx={{ m: "4%", height: "96%", mb: 0, ml: 0 }}
          >
            <Box
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1,
                mb: "4%",
                width: 0.6,
              }}
            >
              <ToggleSwitch
                values={["Tháng", "Quý", "Năm"]}
                selected={viewOption}
                onChange={onChangeDropdown}
                changeGraph={handle}
              />
            </Box>
            <Table data={tableData} />
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
}
