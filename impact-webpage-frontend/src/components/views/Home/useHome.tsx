import {
  COLOR_PALETTE_CHART,
  SENSOR_TYPES,
} from "@/components/ui/Charts/ChartCard.constant";
import { useWebSocket } from "@/contexts/WebSocketContext";
import predictionServices from "@/services/prediction.services";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const useHome = () => {
  const { latestSensor } = useWebSocket();
  const { latestChart } = useWebSocket(); // ✅ Get WebSocket data
  const [currentSensor, setCurrentSensor] =
    useState<(typeof SENSOR_TYPES)[number]>("pH");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isReady } = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SENSOR_TYPES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentSensor(SENSOR_TYPES[currentIndex]);
  }, [currentIndex]);

  // ✅ Compute `colorPallete` dynamically based on WebSocket data
  const colorPallete = useMemo(() => {
    if (!latestChart?.data) return COLOR_PALETTE_CHART.default([]);

    return COLOR_PALETTE_CHART[
      currentSensor as keyof typeof COLOR_PALETTE_CHART
    ]
      ? COLOR_PALETTE_CHART[currentSensor as keyof typeof COLOR_PALETTE_CHART](
          latestChart.data
            .map((item) => Number(item[currentSensor as keyof typeof item])) // Convert values to numbers
            .filter((value) => !isNaN(value)), // Remove NaN values
        )
      : COLOR_PALETTE_CHART.default(latestChart?.data?.map(() => 0) || []);
  }, [latestChart, currentSensor]);

  const getLatestPrediction = async () => {
    const { data } = await predictionServices.getLatestPrediction();
    if (data?.data.timestamp) {
      data.data.timestamp = formatISOTimeWithDate(
        convertToTaiwanTime(data.data.timestamp),
      );
    }

    return data.data;
  };

  const { data: dataLatestPrediction } = useQuery({
    queryKey: ["Prediction"],
    queryFn: () => getLatestPrediction(),
    enabled: isReady,
  });

  return {
    colorPallete,
    latestChart,
    latestSensor,
    currentSensor,
    setCurrentSensor,

    dataLatestPrediction,
  };
};

export default useHome;
