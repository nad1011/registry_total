import { useState, useEffect } from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB } from "../../database/cache";
import { updateGraph, updateTable, updateStat } from "./function";

import { Box, Grid, Stack, Typography } from "@mui/material";

import StatisticBox from "../../components/Box/StatisticBox";
import ToggleSwitch from "../../components/TripleToggleSwitch/TripleToggleSwitch";
import LineChart from "../../components/LineChart";
import Page from "../../components/Page";
import Switch from "../../components/Switch";
import Table from "../../components/Table";

const Statistic = () => {
  const certs = useLiveQuery(() =>
    dexieDB.table("certificate").where("center").equals(localStorage.getItem("id")).toArray()
  );
  const [dateList, setDateList] = useState([]);

  const [graph, setGraph] = useState([
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
  const [table, setTable] = useState([]);
  const [stat, setStat] = useState({
    registered: { month: 0, quarter: 0, year: 0 },
    expired: { month: 0, quarter: 0, year: 0 },
  });

  const [timeView, setTimeView] = useState("Năm");
  const [stateView, setStateView] = useState("registered");

  useEffect(() => {
    if (!certs) return;
    setDateList(certs.map((cert) => cert[`${stateView}Date`]));
  }, [certs, stateView]);

  useEffect(() => updateGraph(dateList, timeView, graph[0], setGraph), [dateList, timeView]);

  useEffect(() => {
    if (!certs) return;
    updateTable(certs, setTable);
    updateStat(certs, setStat);
  }, [certs]);

  const onTimeSwitch = (mode) => setTimeView(mode);
  const onStateSwitch = (state) => setStateView(state ? "expired" : "registered");

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
                    fontFamily: "var(--font-inter)",
                    fontSize: { xs: "15px", sm: "20px", md: "22px", lg: "22px" },
                    color: "var(--title-color)",
                    zIndex: 1,
                  }}
                >
                  Thống kê số lượng xe {stateView === "registered" ? "đăng kiểm" : "hết hạn"}
                </Typography>
                <Switch onSwitch={onStateSwitch} />
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
              <LineChart data={graph} />
            </Box>
            <Stack
              direction="row"
              spacing={"var(--padding-item)"}
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
                month={stat.registered.month}
                quarter={stat.registered.quarter}
                year={stat.registered.year}
              />
              <StatisticBox
                title={"Số lượng hết hạn gần đây"}
                month={stat.expired.month}
                quarter={stat.expired.quarter}
                year={stat.expired.year}
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          justifyContent="center"
          height={{
            xs: "100%",
            sm: "100%",
            md: "100%",
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
            <Box
              sx={{
                borderRadius: 2,
                p: 0.5,
                pb: "var(--padding-item)",
                width: 0.7,
                height: "8.5%",
              }}
            >
              <ToggleSwitch
                values={["Tháng", "Quý", "Năm"]}
                selected={timeView}
                onChange={onTimeSwitch}
              />
            </Box>
            <Table data={table} />
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Statistic;
