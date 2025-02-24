import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@heroui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ChartOptions,
} from "chart.js";
import useChartCard from "./useChartCard";
import { formatISOTimeWithDate } from "@/utils/timeFormatter";
import { useTheme } from "next-themes";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  title: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const SENSOR_TYPES = [
  "temperature",
  "pH",
  "conductivity",
  "oxygen",
  "ppm",
  "pm25",
];

const ChartCard = (props: PropTypes) => {
  const { theme } = useTheme();
  const { title } = props;
  const { colorPallete, latestChart, currentSensor, setCurrentSensor } =
    useChartCard();

  let labels = latestChart?.data.map((item) => {
    const date = new Date(item.createdAt);
    return formatISOTimeWithDate(date);
  });

  const data = {
    labels,
    datasets: [
      {
        label: `${currentSensor.toUpperCase()}`,
        data:
          latestChart?.data.map(
            (item) => item[currentSensor as keyof typeof item],
          ) || [],
        backgroundColor: colorPallete,
        pointBackgroundColor: colorPallete,
        borderColor:
          theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
        pointRadius: 6,
        pointBorderWidth: 0,
        pointHoverRadius: 3,
        pointHitRadius: 10,
        tension: 0.4,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "white" : "black",
          font: {
            weight: "bold",
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          color: theme === "dark" ? "white" : "black",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.2)",
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 7,
          padding: 10,
          color: theme === "dark" ? "white" : "black",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        grid: {
          color: "gray",
        },
      },
    },
  };

  const isLoading = !latestChart || !latestChart.data.length;
  console.log(isLoading);

  return (
    <Card className="mb-4 dark:bg-primary-800">
      <CardHeader className="flex justify-between">
        {title}
        <Dropdown>
          <DropdownTrigger>
            <Button className="hover:!bg-transparent" variant="light">
              <CiMenuKebab className="text-xl" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="temperature"
              onPress={() => setCurrentSensor("temperature")}
            >
              Temperature
            </DropdownItem>
            <DropdownItem key="pH" onPress={() => setCurrentSensor("pH")}>
              Acidity
            </DropdownItem>
            <DropdownItem
              key="conductivity"
              onPress={() => setCurrentSensor("conductivity")}
            >
              Conductivity
            </DropdownItem>
            <DropdownItem
              key="oxygen"
              onPress={() => setCurrentSensor("oxygen")}
            >
              Dissolved Oxygen
            </DropdownItem>
            <DropdownItem key="ppm" onPress={() => setCurrentSensor("ppm")}>
              Dissolved Solid
            </DropdownItem>
            <DropdownItem key="pm25" onPress={() => setCurrentSensor("pm25")}>
              PM2.5 (Air Pollution)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <Divider />
      <CardBody className="h-[300px]">
        {isLoading ? (
          <Skeleton className="h-[100%] w-full" />
        ) : (
          <Line data={data} options={options} />
        )}
      </CardBody>
    </Card>
  );
};

export default ChartCard;
