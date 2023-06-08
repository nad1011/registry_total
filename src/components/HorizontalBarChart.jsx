import { Box } from "@mui/material";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function HorizontalBarChart({ title, tableData }) {
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
        position: "bottom",
      },
      title: {
        display: true,
        color: "#00ADB5",
        fontFamily: "inter",
        font: {
          size: 18,
          family: "inter",
        },
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
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "transparent",
        backgroundColor: "#B9EDDD",
      },
      {
        label: "Dự đoán",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        borderColor: "transparent",
        backgroundColor: "#569DAA",
      },
    ],
  };
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "40%", md: 1 / 2, lg: "95%" },
        height: { xs: "100%", md: "100%", lg: "33%" },
      }}
    >
      <Bar options={options} data={data} />
    </Box>
  );
}
