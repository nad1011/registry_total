import React, { useState, useEffect } from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB, user, getDocID } from "../database/cache";

import { Box, Grid, Stack, Typography } from "@mui/material";
import ToggleSwitch from "../components/TripleToggleSwitch/TripleToggleSwitch";
import LineChart from "../components/LineChart";
import Page from "../components/Page/Page";
import Switch from "../components/Switch";
import Table from "../components/Table";

export default function Statistic() {
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
    dexieDB.table("certificate").where("center").equals(user.id).toArray()
  );
  const [dateList, setDateList] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [timeView, setTimeView] = useState("Năm");
  const [stateView, setStateView] = useState("registered");

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
    if (!certs) return;
    setDateList(certs.map((cert) => cert[`${stateView}Date`]));
    changeTimeView();
  }, [certs, stateView]);

  useEffect(() => {
    if (!certs) return;
    const reloadTable = async () => {
      setTableData(
        await Promise.all(
          certs.map(async (cert) => {
            const car = await dexieDB.table("car").get(getDocID(cert.car));
            const owner = await dexieDB.table("owner").get(getDocID(car.owner));
            return {
              certID: cert.id,
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

  const onChangeDropdown = (mode) => setTimeView(mode);
  const onToggleSwitch = (state) => setStateView(state ? "expired" : "registered");

  return (
    <Page>
      <Grid container justifyContent="center" spacing={0} height={1}>
        <Grid
          item
          justifyContent="center"
          height={{
            xs: "70%",
            sm: "80%",
            md: "85%",
            lg: "100%",
          }}
          lg={8}
          md={12}
          xs={12}
        >
          <Stack spacing={{ xs: 0, sm: 0 }} sx={{ m: "2%", height: "97%", mb: 0 }}>
            <Box
              sx={{
                bgcolor: "var(--secondary-color)",
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
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Raleway",
                    fontSize: 25,
                    color: "#000",
                    zIndex: 1,
                  }}
                >
                  Statistic
                </Typography>
                <Switch onSwitch={onToggleSwitch} />
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
                height: 0.5,
              }}
            >
              <LineChart viewOption={timeView} data={graphData} />
            </Box>
            <Stack
              direction="row"
              sx={{
                height: 0.39,
                mt: "2% !important",
              }}
            >
              <Box
                sx={{
                  bgcolor: "var(--secondary-color)",
                  borderRadius: 2,
                  p: 1,
                  width: 0.5,
                  height: 1,
                  mr: "2% !important",
                }}
              >
                <Stack
                  justifyContent="space-between"
                  sx={{
                    color: "var(--avatar-color)",
                    p: 3,
                    height: 1,
                  }}
                >
                  <Typography
                    height={"35%"}
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "roboto mono",
                      fontSize: 17,
                    }}
                  >
                    Tổng lượng đăng kiểm gần nhất
                  </Typography>
                  <Stack
                    height={"65%"}
                    justifyContent="space-between"
                    mx={{
                      xs: 0,
                      sm: 0,
                      md: 0,
                      lg: 5,
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        sx={{
                          fontFamily: "poppins",
                        }}
                      >
                        Tháng
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "poppins",
                          fontSize: 16,
                        }}
                      >
                        10
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        sx={{
                          fontFamily: "poppins",
                        }}
                      >
                        Quý
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "poppins",
                          fontSize: 16,
                        }}
                      >
                        20
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography
                        sx={{
                          fontFamily: "poppins",
                        }}
                      >
                        Năm
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "poppins",
                          fontSize: 16,
                        }}
                      >
                        30
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
              <Box
                sx={{
                  bgcolor: "var(--secondary-color)",
                  borderRadius: 2,
                  p: 1,
                  width: 0.5,
                  height: 1,
                }}
              >
                <Stack
                  sx={{
                    color: "var(--avatar-color)",
                  }}
                >
                  <Typography>Số lượng xe sắp hết hạn:</Typography>
                  <Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Tháng </Typography>
                      <Typography>10</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Quý </Typography>
                      <Typography>20</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>Năm </Typography>
                      <Typography>30</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          justifyContent="center"
          height={{
            xs: "70%",
            sm: "80%",
            md: "85%",
            lg: "100%",
          }}
          lg={4}
          md={10}
          xs={11}
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 0, sm: 0 }}
            sx={{ height: "96%", m: "3.4%", mb: 0, ml: 0 }}
            mb={{
              lg: "0%",
              xs: "3.4%",
            }}
            mr={{
              lg: "3.4%",
              xs: "0%",
            }}
            mt={{
              lg: "3.4%",
              xs: "0%",
            }}
          >
            <Box
              mb={{
                xs: "2%",
                lg: "4%",
              }}
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                p: 1,
                width: 0.6,
              }}
            >
              <ToggleSwitch
                values={["Tháng", "Quý", "Năm"]}
                selected={timeView}
                onChange={onChangeDropdown}
                changeGraph={changeTimeView}
              />
            </Box>
            <Table data={tableData} />
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
}