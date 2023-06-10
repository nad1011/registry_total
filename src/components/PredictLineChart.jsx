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

const options = {
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
      text: "Dự đoán số lượng đăng kiểm trong các tháng tới",
      color: "#569DAA",
      font: {
        size: 20,
        family: "inter",
      },
    },
  },
};

export default function LineChart({ average }) {
  const dates = [new Date()];
  while (dates.length < 6) {
    let date = dates.pop();
    let nextDate = new Date(date);
    nextDate.setMonth(nextDate.getMonth() + 1);
    dates.push(date, nextDate);
  }
  const labels = dates.map((date) => {
    const month = "0" + (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month.slice(-2)}/${year}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng",
        data: labels.map(() => {
          const val = average + faker.number.int({ min: -5, max: 5 });
          return val < 0 ? 0 : val;
        }),
        borderColor: "#00ADB5",
        backgroundColor: "#14b0b9",
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
