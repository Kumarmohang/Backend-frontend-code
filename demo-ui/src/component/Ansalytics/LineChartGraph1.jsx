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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChartGraph1 = ({ graphdata }) => {
  const labels = [
    "1880-89",
    "1890-99",
    "1900-09",
    "1910-19",
    "1920-29",
    "1930-39",
    "1940-49",
    "1950-59",
    "1960-69",
    "1970-79",
    "1980-89",
    "1990-99",
    "2000-09",
    "2010-19",
    "2020-29",
  ];

  const datasets = [];
  for (let i = 0, len = graphdata.length; i < len; i++) {
    if (graphdata?.[i]?.brand === "Bugatti") {
      datasets.push({
        label: "Bugatti",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(156,62,0)",
        backgroundColor: "rgba(156,62,0,0.5)",
      });
    } else if (graphdata?.[i]?.brand === "Ferrari") {
      datasets.push({
        label: "Ferrari",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(217,105,65)",
        backgroundColor: "rgba(217,105,65,0.5)",
      });
    } else if (graphdata?.[i]?.brand === "Lamborghini") {
      datasets.push({
        label: "Lamborghini",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(183,191,153)",
        backgroundColor: "rgba(183,191,153, 0.5)",
      });
    } else if (graphdata?.[i]?.brand === "McLaren") {
      datasets.push({
        label: "McLaren",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(0,99,90)",
        backgroundColor: "rgba(0,99,90,0.5)",
      });
    } else if (graphdata?.[i]?.brand === "Mercedes") {
      datasets.push({
        label: "Mercedes",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(227,199,95)",
        backgroundColor: "rgba(227,199,95,0.5)",
      });
    } else if (graphdata?.[i]?.brand === "Pagani") {
      datasets.push({
        label: "Pagani",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(237,170,37)",
        backgroundColor: "rgba(237,170,37, 0.5)",
      });
    } else if (graphdata?.[i]?.brand === "Porsche") {
      datasets.push({
        label: "Porsche",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(0,277,204)",
        backgroundColor: "rgba(0,277,204,0.5)",
      });
    } else if (graphdata?.[i]?.brand === "Consolidated") {
      datasets.push({
        label: "Consolidated",
        data: graphdata?.[i]?.data,
        borderColor: "rgb(166,188,9)",
        backgroundColor: "rgba(166,188,9, 0.5)",
      });
    }
  }

  const data = {
    labels,
    datasets,
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        top: 5,
        left: 15,
        right: 15,
        bottom: 15,
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const info = [
              `Value: ${context.raw.y}`,
              `Car's count: ${context.raw.count}`,
            ];
            return info;
          },
        },
      },
    },
  };

  return (
    <div className="graph-box">
      <Line data={data} options={options} />
    </div>
  );
};
