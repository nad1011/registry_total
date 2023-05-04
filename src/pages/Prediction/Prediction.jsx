import { Button } from "@mui/material";
import Page from "../Page/Page";
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
  return (
    <Page>
      <Button>Generate</Button>
      <PredictChart data={data} />
    </Page>
  );
};

export default Prediction;
