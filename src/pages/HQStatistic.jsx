import React, { useState, useEffect } from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB } from "../database/cache";

import { Box, Grid, Stack, Typography } from "@mui/material";
import Dropdown from "../components/Dropdown";
import StatisticBox from "../components/Box/StatisticBox/StatisticBox";
import ToggleSwitch from "../components/TripleToggleSwitch/TripleToggleSwitch";
import LineChart from "../components/LineChart";
import Page from "../components/Page/Page";
import Switch from "../components/Switch";
import Table from "../components/Table";

const HQStatistic = () => {
  const [graphData, setGraphData] = useState([
    {
      id: "statistic",
      color: "#969696",
      data: Array.from({ length: 10 }, (_, i) => {
        return {
          x: 2014 + i,
          y: 0,
        };
      }),
    },
  ]);

  const certs = useLiveQuery(() =>
    dexieDB.table("certificate").where("id").notEqual("center").toArray()
  );
  const [filteredCerts, setFilteredCerts] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [timeView, setTimeView] = useState("Năm");
  const [stateView, setStateView] = useState("registered");
  const [centerView, setCenterView] = useState("All");

  const center = useLiveQuery(() => dexieDB.table("certificate").get("center"));

  const countDateByYear = () => {
    const yearCount = dateList.reduce(
      (obj, date) => {
        const year = Number(date.split("/")[2]);
        obj.latestYear = Math.max(obj.latestYear, year);
        obj[year] = (obj[year] || 0) + 1;
        return obj;
      },
      { latestYear: new Date().getFullYear() }
    );
    return Array.from({ length: 10 }, (_, i) => yearCount.latestYear - 9 + i).reduce(
      (obj, year) => {
        obj[year] = yearCount[year] || 0;
        return obj;
      },
      {}
    );
  };

  const countDateByQuarter = () => {
    const getQuarterNum = (year, month) => year * 4 + Math.ceil(month / 3) - 1;
    const curDate = new Date();
    const quarterCount = dateList.reduce(
      (obj, date) => {
        const [, month, year] = date.split("/").map(Number);
        const quarterNum = getQuarterNum(year, month);
        obj.latestQuarterNum = Math.max(obj.latestQuarterNum, quarterNum);
        obj[quarterNum] = (obj[quarterNum] || 0) + 1;
        return obj;
      },
      {
        latestQuarterNum: getQuarterNum(curDate.getFullYear(), curDate.getMonth()),
      }
    );
    return Array.from({ length: 10 }, (_, i) => quarterCount.latestQuarterNum - 9 + i).reduce(
      (obj, quarterNum) => {
        const quarter = `Q${(quarterNum % 4) + 1}-${parseInt(quarterNum / 4)}`;
        obj[quarter] = quarterCount[quarterNum] || 0;
        return obj;
      },
      {}
    );
  };

  const countDateByMonth = () => {
    const getMonthNum = (year, month) => year * 12 + month;
    const curDate = new Date();
    const monthCount = dateList.reduce(
      (obj, date) => {
        const [, month, year] = date.split("/").map(Number);
        const monthNum = getMonthNum(year, month - 1);
        obj.latestMonthNum = Math.max(obj.latestMonthNum, monthNum);
        obj[monthNum] = (obj[monthNum] || 0) + 1;
        return obj;
      },
      {
        latestMonthNum: getMonthNum(curDate.getFullYear(), curDate.getMonth()),
      }
    );
    return Array.from({ length: 10 }, (_, i) => monthCount.latestMonthNum - 9 + i).reduce(
      (obj, monthNum) => {
        const month = `0${(monthNum % 12) + 1}`.slice(-2) + `-${parseInt(monthNum / 12)}`;
        obj[month] = monthCount[monthNum] || 0;
        return obj;
      },
      {}
    );
  };

  const changeTimeView = () => {
    const rawData = {
      Năm: () => countDateByYear(),
      Quý: () => countDateByQuarter(),
      Tháng: () => countDateByMonth(),
    }[timeView]();

    setGraphData([
      {
        ...graphData[0],
        data: Object.keys(rawData).map((key) => {
          return {
            x: key,
            y: rawData[key],
          };
        }),
      },
    ]);
  };

  useEffect(() => {
    setDateList(filteredCerts.map((cert) => cert[`${stateView}Date`]));
    changeTimeView();
  }, [filteredCerts, stateView]);

  useEffect(() => {
    if (!certs) return;
    const reloadTable = async () => {
      setTableData(
        await Promise.all(
          certs.map(async (cert) => {
            const car = await dexieDB.table("car").get(cert.car);
            const owner = await dexieDB.table("owner").get(car.owner);
            return {
              id: cert.id,
              center: cert.center,
              regDate: cert.registeredDate,
              licensePlate: car.regNum,
              owner: owner.name,
            };
          })
        )
      );
    };
    reloadTable();
  }, [certs]);

  useEffect(() => {
    if (!certs) return;
    setFilteredCerts(
      centerView === "All" ? certs : certs.filter((cert) => cert.center === centerView)
    );
  }, [certs, centerView]);

  useEffect(() => {}, []);

  const onTimeSwitch = (mode) => setTimeView(mode);
  const onViewSwitch = (state) => setStateView(state ? "expired" : "registered");
  const onCenterSwitch = (center) => setCenterView(center);

  return (
    <Page>
      <Grid container justifyContent="center" spacing={0} height={1}>
        <Grid
          item
          justifyContent="center"
          height={{
            xs: "70%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          lg={8}
          md={12}
          xs={12}
        >
          <Stack spacing={{ xs: 0, sm: 0 }} sx={{ p: "var(--padding-item)", height: "100%" }}>
            <Box
              sx={{
                bgcolor: "var(--secondary-color)",
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                p: "var(--padding-item)",
                pt: 1,
                mb: 0,
                width: 1,
                height: "10%",
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Inter",
                    fontSize: {
                      xs: "15px",
                      sm: "20px",
                      md: "22px",
                      lg: "22px",
                    },
                    color: "var(--avatar-color)",
                    zIndex: 1,
                  }}
                >
                  Thống kê số lượng xe đăng kiểm
                </Typography>
                <Switch onSwitch={onViewSwitch} />
              </Stack>
            </Box>
            <Box
              sx={{
                bgcolor: "var(--secondary-color)",
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                p: 1,
                pt: 0,
                mb: 2,
                width: 1,
                height: "50%",
              }}
            >
              <LineChart viewOption={timeView} data={graphData} />
            </Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: 1,
                height: "40%",
                mt: "var(--padding-item) !important",
              }}
            >
              <StatisticBox
                title={"Số lượng đăng kiểm gần đây"}
                month={123}
                quarter={222}
                year={897}
              />
              <StatisticBox
                title={"Số lượng xe hết hạn đăng kiểm"}
                month={123}
                quarter={222}
                year={897}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          justifyContent="center"
          height={{
            xs: "70%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          lg={4}
          md={12}
          xs={12}
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 0, sm: 0 }}
            sx={{
              height: "100%",
              p: "var(--padding-item)",
              pl: { lg: "0", xs: "var(--padding-item)" },
              pt: { lg: "var(--padding-item)", xs: "0" },
            }}
          >
            <Grid container>
              <Grid container item xs={7}>
                <Box
                  sx={{
                    width: 1,
                    bgcolor: "#fff",
                    borderRadius: 2,
                    p: 1,
                    mb: "var(--padding-item)",
                  }}
                >
                  <ToggleSwitch
                    values={["Tháng", "Quý", "Năm"]}
                    selected={timeView}
                    onChange={onTimeSwitch}
                    changeGraph={changeTimeView}
                  />
                </Box>
              </Grid>
              <Grid container item xs={5}>
                <Dropdown options={center?.codes ?? []} onSelect={onCenterSwitch} />
              </Grid>
            </Grid>

            <Table data={tableData} />
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default HQStatistic;
