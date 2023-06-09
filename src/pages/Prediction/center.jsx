import { Grid, Box, Stack } from "@mui/material";

import Page from "../../components/Page";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import LineChart from "../../components/PredictLineChart";
import PredictBox from "../../components/Box/PredictBox";

const Prediction = () => {
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
          pb={"calc(var(--padding-item)*3)"}
        >
          <Box
            sx={{
              bgcolor: "var(--secondary-color)",
              borderRadius: 2,
              pl: 1,
              pr: 1,
              width: 1,
              height: { xs: "55%", sm: "60%", md: "60%", lg: "60%" },
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
              height: { xs: "25%", sm: "20%", md: "20%", lg: "20%" },
            }}
          >
            <Grid container item xs={4} pr={1}>
              <PredictBox head={"tháng"} value={312} percent={-1.0} />
            </Grid>
            <Grid container item xs={4} pr={1}>
              <PredictBox head={"quý"} value={331} percent={-2.0} />
            </Grid>
            <Grid container item xs={4}>
              <PredictBox head={"năm"} value={256} percent={+5.0} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Prediction;
