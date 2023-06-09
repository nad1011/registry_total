import { Grid, Box, Stack, Typography } from "@mui/material";

import { useLiveQuery } from "dexie-react-hooks";
import { dexieDB } from "../../database/cache";

import Page from "../../components/Page";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import LineChart from "../../components/PredictLineChart";
import PredictBox from "../../components/Box/PredictBox";
import Dropdown from "../../components/PredictDropdown";

const Prediction = () => {
  const center = useLiveQuery(() => dexieDB.table("certificate").get("center"));

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
            <HorizontalBarChart title={"Tháng"} />
            <HorizontalBarChart title={"Quý"} />
            <HorizontalBarChart title={"Năm"} />
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
          <Stack
            direction={"row"}
            sx={{
              width: 1,
              height: { xs: "10%", sm: "10%", md: "10%", lg: "10%" },
            }}
          >
            <Typography
              sx={{
                width: "50%",
                height: "100%",
                fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.2rem", lg: "1.5rem" },
                fontWeight: "bold",
                fontFamily: "var(--font-inter)",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                pb: "var(--padding-item)",
                color: "#569DAA",
                textShadow: "0 0 1em rgba(86, 157, 170, 0.8)",
              }}
            >
              Lựa chọn trung tâm&nbsp;
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: 2,
                width: "50%",
                height: "100%",
                color: "#051c33",
              }}
            >
              <Dropdown options={center?.codes ?? []} onSelect={(option) => {}} />
            </Box>
          </Stack>
          <Box
            sx={{
              bgcolor: "var(--secondary-color)",
              borderRadius: 2,
              pl: 1,
              pr: 1,
              width: 1,
              height: { xs: "55%", sm: "60%", md: "60%", lg: "70%" },
              color: "#051c33",
            }}
          >
            <LineChart />
          </Box>
          <Grid
            container
            direction="row"
            sx={{
              justifyContent: "space-between",
              mt: "var(--padding-item)",
              width: 1,
              height: { xs: "30%", sm: "30%", md: "30%", lg: "20%" },
            }}
          >
            <Grid container item xs={4} pr={1}>
              <PredictBox head={"Tháng"} value={312} percent={-1.0} />
            </Grid>
            <Grid container item xs={4} pr={1}>
              <PredictBox head={"Quý"} value={331} percent={-2.0} />
            </Grid>
            <Grid container item xs={4}>
              <PredictBox head={"Năm"} value={256} percent={+5.0} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Prediction;
