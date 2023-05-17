import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function HorizontalBarChart({title}) {
  const labels = ["One"];
  const options = {
    indexAxis: "y",
    maintainAspectRatio: false,
    aspectRatio: 2,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {

      // to remove the y-axis labels
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        // to remove the y-axis grid
        grid: {
          drawBorder: true,
          display: true,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Gần đây",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dự đoán",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(100, 99, 132)",
        backgroundColor: "rgba(100, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div style={{ width: "90%", height: "25%" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
