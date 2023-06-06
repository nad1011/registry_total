import { useState, useEffect } from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB } from "../../database/cache";
import { updateGraph, updateTable, updateStat } from "./function";

import { Box, Grid, Stack, Typography } from "@mui/material";

import Dropdown from "../../components/Dropdown";
import StatisticBox from "../../components/Box/StatisticBox";
import ToggleSwitch from "../../components/TripleToggleSwitch/TripleToggleSwitch";
import LineChart from "../../components/LineChart";
import Page from "../../components/Page";
import Switch from "../../components/Switch";
import Table from "../../components/Table";

const Statistic = () => {
  const certs = useLiveQuery(() =>
    dexieDB.table("certificate").where("id").notEqual("center").toArray()
  );
  const [filteredCerts, setFilteredCerts] = useState([]);
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
  const center = useLiveQuery(() => dexieDB.table("certificate").get("center"));
  const [table, setTable] = useState([]);
  const [stat, setStat] = useState({
    registered: { month: 0, quarter: 0, year: 0 },
    expired: { month: 0, quarter: 0, year: 0 },
  });

  const [timeView, setTimeView] = useState("Năm");
  const [stateView, setStateView] = useState("registered");
  const [centerView, setCenterView] = useState("Tất cả");

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

  useEffect(() => updateGraph(dateList, timeView, graph[0], setGraph), [dateList, timeView]);

  useEffect(() => {
    updateTable(filteredCerts, setTable);
    updateStat(filteredCerts, setStat);
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
              <LineChart data={graph} />
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
            <Table data={table} />
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Statistic;
