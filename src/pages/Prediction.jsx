import React from "react";

import { Grid, Box, Stack, Typography } from "@mui/material";

import Page from "../components/Page";
import HorizontalBarChart from "../components/HorizontalBarChart";
import { LineChart } from "../components/PredictLineChart";
import PredictBox from "../components/Box/PredictBox";

const Prediction = () => {
  const linearRegression = (data) => {
    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_xx = 0;
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      const x = data[i].y;
      const y = i + 1;

      sum_x += x;
      sum_y += y;
      sum_xy += x * y;
      sum_xx += x * x;

      count++;
    }

    const slope =
      (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
    const intercept = (sum_y - slope * sum_x) / count;

    return { slope: slope, intercept: intercept };
  };

  // const regression = () => {
  //   const regression = linearRegression(data[0].data);
  //   console.log(regression);
  // };

  return (
    <Page>
      <Grid container height={1}>
        <Grid
          container
          item
          height={{
            xs: "30%",
            // sm: "30%",
            // md: "30%",
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
              // px: 1,
              mt: "var(--padding-item)",
              width: 1,
              height: { xs: "25%", sm: "20%", md: "20%", lg: "20%" },
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "var(--secondary-color)",

              borderRadius: 2,
              pl: 1,
              pr: 1,
              width: 1,
              mt: "var(--padding-item)",
              height: 0.2,
              color: "#051c33",
            }}
          >
            <Typography
              variant="body1"
              fontFamily={"var(--font-inter)"}
              sx={{
                fontSize: { xs: 11, sm: 13, md: 16, lg: 18 },
              }}
            >
              Dựa trên những dữ liệu thống kê, có thể nhận thấy rằng có một xu
              hướng tăng mạnh về số lượng đăng kiểm ô tô trong tương lai. Chính
              vì vậy, nhu cầu đăng kiểm ô tô sẽ tiếp tục tăng và có thể trở
              thành một vấn đề quan trọng đối với các chính phủ và tổ chức liên
              quan.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Prediction;
