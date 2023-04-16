import React from "react";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(62, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 216,
      },
      {
        x: "helicopter",
        y: 222,
      },
      {
        x: "boat",
        y: 108,
      },
      {
        x: "train",
        y: 133,
      },
      {
        x: "subway",
        y: 281,
      },
      {
        x: "bus",
        y: 190,
      },
      {
        x: "car",
        y: 202,
      },
      {
        x: "moto",
        y: 187,
      },
      {
        x: "bicycle",
        y: 181,
      },
      {
        x: "horse",
        y: 191,
      },
      {
        x: "skateboard",
        y: 252,
      },
      {
        x: "others",
        y: 106,
      },
    ],
  },
];
function LineChart() {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 30 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      colors={{ scheme: "category10" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      useMesh={true}
      areaBaselineValue={100}
      gridXValues={100}
    />
  );
}

export default LineChart;
