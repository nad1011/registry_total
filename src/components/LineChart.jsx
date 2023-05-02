import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Theme } from "@nivo/core";
function LineChart({ viewOption, data }) {
  return (
    <>
      {/* <button onClick={handle}>ok</button> */}
      <ResponsiveLine
        data={data}
        theme={{
          fontFamily: 'roboto mono',
          fontSize: 10,
        }}
        margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        enableGridX={false}
        enableGridY={false}
        yFormat=" >-.2f"
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 20,
          tickRotation: 0,
          // legend: "transportation",
          // legendOffset: 36,
          // legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          // legend: "count",
          // legendOffset: -40,
          // legendPosition: "middle",
        }}
        colors={{ scheme: "category10" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        // enableArea={true}
        useMesh={true}
        // areaBaselineValue={0}
        gridXValues={5}
        enablePoints={false}
      />
    </>
  );
}

export default LineChart;
