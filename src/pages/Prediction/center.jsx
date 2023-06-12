import { useState, useEffect } from "react";

import { Grid, Box, Stack } from "@mui/material";

import Page from "../../components/Page";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import LineChart from "../../components/PredictLineChart";
import PredictBox from "../../components/Box/PredictBox";

import { dexieDB } from "../../database/cache";
import { useLiveQuery } from "dexie-react-hooks";

import { updateRecent, updatePredicted, updatePercent } from "./function";

const Prediction = () => {
  const certs = useLiveQuery(() =>
    dexieDB.table("certificate").where("center").equals(localStorage.getItem("id")).toArray()
  );

  const [recentStat, setRecentStat] = useState({ year: 0, quarter: 0, month: 0 });
  const [predictedStat, setPredictedStat] = useState({ year: 0, quarter: 0, month: 0 });
  const [percent, setPercent] = useState({ year: 0, quarter: 0, month: 0 });

  useEffect(() => {
    if (!certs) return;
    updateRecent(
      certs.map((cert) => cert.expiredDate),
      setRecentStat
    );
    updatePredicted(
      certs.map((cert) => cert.registeredDate),
      setPredictedStat
    );
  }, [certs]);

  useEffect(() => {
    updatePercent(recentStat, predictedStat, setPercent);
  }, [recentStat, predictedStat]);

  return (
    <Page>
      <Grid container height={1}>
        <Grid
          container
          item
          height={{
            xs: "30%",
            lg: "100%",
          }}
          md={12}
          lg={5}
          p={"var(--padding-item)"}
        >
          <Stack
            direction={{
              xs: "row",
              sm: "row",
              md: "row",
              lg: "column",
            }}
            overflow={"auto"}
            justifyContent={{
              xs: "space-between",
              sm: "space-between",
              md: "none",
              lg: "space-evenly",
            }}
            spacing={1}
            alignItems={"center"}
            sx={{
              bgcolor: "var(--secondary-color)",
              borderRadius: 2,
              width: 1.0,
              height: 1.0,
            }}
          >
            <HorizontalBarChart
              title={"Tháng"}
              recent={recentStat.month}
              predicted={predictedStat.month}
            />
            <HorizontalBarChart
              title={"Quý"}
              recent={recentStat.quarter}
              predicted={predictedStat.quarter}
            />
            <HorizontalBarChart
              title={"Năm"}
              recent={recentStat.year}
              predicted={predictedStat.year}
            />
          </Stack>
        </Grid>
        <Grid
          container
          item
          justifyContent="center"
          height={{
            xs: "70%",
            sm: "80%",
            md: "90%",
            lg: "100%",
          }}
          md={12}
          lg={7}
          p={"var(--padding-item)"}
          pl={{
            xs: "var(--padding-item)",
            lg: 0,
          }}
          pt={{
            xs: 0,
            lg: "var(--padding-item)",
          }}
          pb={"calc(var(--padding-item)*2)"}
        >
          <Box
            sx={{
              bgcolor: "var(--secondary-color)",
              borderRadius: 2,
              pl: 1,
              pr: 1,
              width: 1,
              height: { xs: "65%", sm: "70%", md: "70%", lg: "70%" },
              color: "#051c33",
            }}
          >
            <LineChart average={predictedStat.month} />
          </Box>
          <Grid
            container
            direction="row"
            sx={{
              justifyContent: "space-between",
              mt: "var(--padding-item)",
              width: 1,
              height: { xs: "35%", sm: "30%", md: "30%", lg: "30%" },
            }}
          >
            <Grid container item xs={4} pr={1}>
              <PredictBox head={"tháng"} value={predictedStat.month} percent={percent.month} />
            </Grid>
            <Grid container item xs={4} pr={1}>
              <PredictBox head={"quý"} value={predictedStat.quarter} percent={percent.quarter} />
            </Grid>
            <Grid container item xs={4}>
              <PredictBox head={"năm"} value={predictedStat.year} percent={percent.year} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Prediction;
