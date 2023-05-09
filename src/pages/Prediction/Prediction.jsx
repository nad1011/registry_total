import { Button, Grid, Box } from "@mui/material";
import Page from "../../components/Page/Page";
import PredictChart from "../../components/PredictChart/PredictChart";

const data = [
  {
    id: "Đăng kiểm lại",
    color: "hsl(262.7027027027027, 82.22222222222221%, 26.47058823529412%)",
    data: [
      {
        x: "plane",
        y: 133,
      },
      {
        x: "helicopter",
        y: 98,
      },
      {
        x: "boat",
        y: 88,
      },
      {
        x: "train",
        y: 163,
      },
      {
        x: "subway",
        y: 184,
      },
      {
        x: "bus",
        y: 114,
      },
      {
        x: "car",
        y: 116,
      },
      {
        x: "moto",
        y: 123,
      },
      {
        x: "bicycle",
        y: 191,
      },
      {
        x: "horse",
        y: 184,
      },
      {
        x: "skateboard",
        y: 278,
      },
      {
        x: "others",
        y: 23,
      },
    ],
  },
  {
    id: "Đăng kiểm mới",
    color: "hsl(177, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 265,
      },
      {
        x: "helicopter",
        y: 79,
      },
      {
        x: "boat",
        y: 271,
      },
      {
        x: "train",
        y: 50,
      },
      {
        x: "subway",
        y: 297,
      },
      {
        x: "bus",
        y: 141,
      },
      {
        x: "car",
        y: 3,
      },
      {
        x: "moto",
        y: 116,
      },
      {
        x: "bicycle",
        y: 288,
      },
      {
        x: "horse",
        y: 79,
      },
      {
        x: "skateboard",
        y: 300,
      },
      {
        x: "others",
        y: 250,
      },
    ],
  },
];

const Prediction = () => {
  const analysis = () => {
    alert(
      "Based on the data, the line graph would likely show that bicycles and skateboards are the most frequently used modes of transportation, with 191 and 278 uses, respectively. Other popular modes of transportation include the subway (184 uses), the horse (also 184 uses), and the plane (133 uses). Less frequently used modes of transportation include boats (88 uses), buses (114 uses), and cars (116 uses). Finally, there were 23 uses categorized as others, which could include a variety of modes of transportation not explicitly listed in the data.Overall, a line graph using this data would provide useful insights into transportation usage patterns and could help inform decisions related to transportation infrastructure and policy."
    );
  };

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

  const regression = () => {
    const regression = linearRegression(data[0].data);
    console.log(regression);
  };

  return (
    <Page>
      <Grid container justifyContent="center" spacing={2} height={1}>
        <Grid
          container
          item
          justifyContent="flex-start"
          alignItems="center"
          xs={8}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
            }}
          ></Box>
        </Grid>
        <Grid
          container
          item
          justifyContent="flex-end"
          alignItems="center"
          xs={4}
        >
          <Box
            sx={{
              bgcolor: "#fff",
              boxShadow: 1,
              borderRadius: 2,
              p: 1,
            }}
          ></Box>
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
            <PredictChart data={data} />
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
              color: "#051c33",
            }}
          >
            Dựa trên những dữ liệu thống kê, có thể nhận thấy rằng có một xu
            hướng tăng mạnh về số lượng đăng kiểm ô tô trong tương lai. Chính vì
            vậy, nhu cầu đăng kiểm ô tô sẽ tiếp tục tăng và có thể trở thành một
            vấn đề quan trọng đối với các chính phủ và tổ chức liên quan.
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Prediction;
