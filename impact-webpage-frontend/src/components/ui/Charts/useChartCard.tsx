import socketServices from "@/services/socket.services";
import { ISensorData } from "@/types/Sensor";
import { useEffect, useState } from "react";
import { COLOR_PALETTE_CHART } from "./ChartCard.constant";

const SENSOR_TYPES: Array<
  keyof typeof COLOR_PALETTE_CHART | "temperature" | "conductivity"
> = ["temperature", "pH", "conductivity", "oxygen", "ppm", "pm25"];

const useChartCard = () => {
  const [latestChart, setLatestChart] = useState<{
    data: ISensorData[];
  } | null>(null);
  const [currentSensor, setCurrentSensor] = useState<
    keyof typeof COLOR_PALETTE_CHART | "temperature" | "conductivity"
  >("pH");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleNewData = (latestChartData: { data: ISensorData[] }) => {
      // console.log("Received new chart data: ", latestChartData);
      setLatestChart(latestChartData);
    };

    socketServices.on("LatestChartSensorData", handleNewData);

    return () => {
      socketServices.off("LatestChartSensorData", handleNewData);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SENSOR_TYPES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentSensor(SENSOR_TYPES[currentIndex]);
  }, [currentIndex]);

  const colorPallete =
    latestChart?.data &&
    COLOR_PALETTE_CHART[currentSensor as keyof typeof COLOR_PALETTE_CHART]
      ? COLOR_PALETTE_CHART[currentSensor as keyof typeof COLOR_PALETTE_CHART](
          latestChart.data
            .map((item) => Number(item[currentSensor as keyof typeof item])) // 🔹 Ensure values are numbers
            .filter((value) => !isNaN(value)), // 🔹 Remove NaN values if conversion fails
        )
      : COLOR_PALETTE_CHART.default(latestChart?.data?.map(() => 0) || []);

  return { colorPallete, latestChart, currentSensor, setCurrentSensor };
};

export default useChartCard;
