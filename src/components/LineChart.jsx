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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const labels = data[0].data.map((item) => item.x);
  const options = {
    scales: {
      x: {
        ticks: {
          color: "#393E46", // Màu sắc của trục X
        },
        grid: {
          display: false, // Tắt grid trục x
        },
      },
      y: {
        ticks: {
          color: "#393E46", // Màu sắc của trục X
        },
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
      },
    },
  };
  const tableData = {
    labels,
    datasets: [
      {
        label: "Số lượng",
        data: data[0].data.map((item) => item.y),
        borderColor: "#00ADB5",
        backgroundColor: "#14b0b9",
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  return <Line options={options} data={tableData} />;
};

export default LineChart;
