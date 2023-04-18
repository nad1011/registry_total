import React from "react";
import Page from "./Page/Page";
import LineChart from "../components/LineChart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dropdown from "../components/Dropdown";
import Switch from "../components/Switch";
import Table from "../components/Table";

export default function Mail() {
  return (
    <Page>
      <Grid container justifyContent="center" spacing={2} height={1} >
        <Grid container item justifyContent="flex-start" alignItems="center" xs={8}>
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
            }}
          >
            <Dropdown />
          </Box>
        </Grid>
        <Grid container item justifyContent="flex-end" alignItems="center" xs={4}>
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
            <LineChart />
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
