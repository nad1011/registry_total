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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  aspectRatio: 2,
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      text: "Dự đoán số lượng đăng kiểm trong tháng tới",
      color: "#569DAA",
      font: {
        size: 20,
        family: "inter",
      },
    },
  },
};

const labels = ["Xe tải", "Máy kéo", "Rơ moóc", "Xe khách", "Ô tô", "Xe cứu thương"];

export const data = {
  labels,
  datasets: [
    {
      label: "Tháng tới",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: "#00ADB5",
      backgroundColor: "#14b0b9",
      cubicInterpolationMode: "monotone",
    },
    {
      label: "Tháng này",
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: "#B9EDDD",
      backgroundColor: "#B9EDDD",
      cubicInterpolationMode: "monotone",
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
