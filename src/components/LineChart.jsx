import React from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function LineChart({ viewOption, data }) {
  const labels = data[0].data.map((item) => item.x);
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Tắt grid trục x
        },
      },
      y: {
        grid: {
          display: false, // Tắt grid trục y
        },
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 2,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Dự đoán số lượng đăng kiểm trong tháng tới",
      },
    },
  };
  const tableData = {
    labels,
    datasets: [
      {
        label: "Blable",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        cubicInterpolationMode: 'monotone', 
      },
    ],
  };
  return <Line options={options} data={tableData} />
}

export default LineChart;
