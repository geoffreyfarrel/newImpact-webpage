import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";
import {
  BoxPlotController,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

interface PropTypes {
  boxplotData: BoxPlotData;
  isLoading: boolean;
  isRefetching: boolean;
  sensorType: string;
  title: string;
  label: string;
}

// Register Chart.js components and the BoxPlot plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BoxPlotController,
  BoxAndWiskers,
  Tooltip,
  Title,
);

// Function to generate colors for sensors
const sensorColors: Record<string, string> = {
  temperature: "rgba(255, 99, 132, 0.6)", // Red
  pH: "rgba(54, 162, 235, 0.6)", // Blue
  conductivity: "rgba(255, 206, 86, 0.6)", // Yellow
  oxygen: "rgba(75, 192, 192, 0.6)", // Teal
  ppm: "rgba(153, 102, 255, 0.6)", // Purple
  pm25: "rgba(255, 159, 64, 0.6)", // Orange
};

const BoxPlotChart = (props: PropTypes) => {
  const { boxplotData, isLoading, isRefetching, label, sensorType, title } =
    props;

  // Extract months as labels
  const labels: string[] = boxplotData ? Object.keys(boxplotData) : [];

  // Ensure the selected sensor exists in the dataset
  const isValidSensor =
    labels.length > 0 &&
    boxplotData[labels[0]][sensorType as keyof MonthlySensorData];

  // Prepare dataset for the selected sensor
  const dataset = {
    label: label,
    backgroundColor: sensorColors[sensorType] || "rgba(100, 100, 100, 0.6)", // Default color
    borderColor:
      sensorColors[sensorType]?.replace("0.6", "1") || "rgba(100, 100, 100, 1)",
    borderWidth: 1,
    data: labels.map(
      (month) => boxplotData[month][sensorType as keyof MonthlySensorData],
    ),
  };

  const data = {
    labels,
    datasets: [dataset],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <Card className="mb-4 flex h-screen w-full justify-center dark:bg-primary-800 lg:h-[250px]">
      <CardHeader>{title}</CardHeader>
      <CardBody>
        {!isLoading && !isRefetching ? (
          <Chart type="boxplot" data={data} options={options} />
        ) : (
          <Skeleton className="h-[100%] w-full" />
        )}
      </CardBody>
    </Card>
  );
};

export default BoxPlotChart;
