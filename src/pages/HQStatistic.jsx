import React, { useState, useEffect } from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB } from "../database/cache";

import { Box, Grid, Stack, Typography } from "@mui/material";
import Dropdown from "../components/Dropdown";
import StatisticBox from "../components/Box/StatisticBox";
import ToggleSwitch from "../components/TripleToggleSwitch/TripleToggleSwitch";
import LineChart from "../components/LineChart";
import Page from "../components/Page";
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
  const [total, setTotal] = useState({
    registered: {
      month: 0,
      quarter: 0,
      year: 0,
    },
    expired: {
      month: 0,
      quarter: 0,
      year: 0,
    },
  });

  const [timeView, setTimeView] = useState("Năm");
  const [stateView, setStateView] = useState("registered");
  const [centerView, setCenterView] = useState("Tất cả");
  const center = useLiveQuery(() => dexieDB.table("certificate").get("center"));

  const countDateByYear = (list = dateList) => {
    const yearCount = list.reduce(
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

  const countDateByQuarter = (list = dateList) => {
    const getQuarterNum = (year, month) => year * 4 + Math.ceil(month / 3) - 1;
    const curDate = new Date();
    const quarterCount = list.reduce(
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

  const countDateByMonth = (list = dateList) => {
    const getMonthNum = (year, month) => year * 12 + month;
    const curDate = new Date();
    const monthCount = list.reduce(
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
    if (!certs) return;
    setFilteredCerts(
      centerView === "Tất cả" ? certs : certs.filter((cert) => cert.center === centerView)
    );
  }, [certs, centerView]);

  useEffect(
    () => setDateList(filteredCerts.map((cert) => cert[`${stateView}Date`])),
    [filteredCerts, stateView]
  );

  useEffect(() => changeTimeView(), [dateList, timeView]);

  useEffect(() => {
    const reloadTable = async () => {
      setTableData(
        await Promise.all(
          filteredCerts.map(async (cert) => {
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

    const recentRegistered = filteredCerts.map((cert) => cert.registeredDate);
    const recentExpired = filteredCerts.map((cert) => cert.expiredDate);

    const getRecent = (obj) => Object.values(obj).pop();

    setTotal({
      registered: {
        month: getRecent(countDateByMonth(recentRegistered)),
        quarter: getRecent(countDateByQuarter(recentRegistered)),
        year: getRecent(countDateByYear(recentRegistered)),
      },
      expired: {
        month: getRecent(countDateByMonth(recentExpired)),
        quarter: getRecent(countDateByQuarter(recentExpired)),
        year: getRecent(countDateByYear(recentExpired)),
      },
    });
  }, [filteredCerts]);

  const switchTime = (mode) => setTimeView(mode);
  const switchState = (state) => setStateView(state ? "expired" : "registered");
  const selectCenter = (center) => setCenterView(center);

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
                    color: "var(--title-color)",
                    zIndex: 1,
                  }}
                >
                  Thống kê số lượng xe đăng kiểm
                </Typography>
                <Switch onSwitch={switchState} />
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
              <LineChart data={graphData} />
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
                month={total.registered.month}
                quarter={total.registered.quarter}
                year={total.registered.year}
              />
              <StatisticBox
                title={"Số lượng hết hạn gần đây"}
                month={total.expired.month}
                quarter={total.expired.quarter}
                year={total.expired.year}
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
              width: "100%",
              p: "var(--padding-item)",
              pl: { lg: "0", xs: "var(--padding-item)" },
              pt: { lg: "var(--padding-item)", xs: "0" },
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                width: "100%",
                height: "8.3%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: 1,
                  height: 1,
                  borderRadius: 2,
                  pb: "var(--padding-item)",
                }}
              >
                <ToggleSwitch
                  values={["Tháng", "Quý", "Năm"]}
                  selected={timeView}
                  onChange={switchTime}
                />
              </Box>
              <Dropdown options={center?.codes ?? []} onSelect={selectCenter} />
            </Stack>
            <Table data={tableData} />
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default HQStatistic;
