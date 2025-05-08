import { useWebSocket } from "@/contexts/WebSocketContext";
import predictionServices from "@/services/prediction.services";
import { SensorPredictionRow } from "@/types/Prediction";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const usePrediction = () => {
  const t = useTranslations();
  const router = useRouter();
  const { latestSensor } = useWebSocket();
  const [refetching, setRefetching] = useState(false);
  const [activeModel, setActiveModel] = useState("gru");

  const getLatestDisplayPredictions = async () => {
    const { data } =
      await predictionServices.getLatestDisplayPredictions(activeModel);
    return data.data;
  };

  const handleChangeActiveModel = (model: string) => {
    setActiveModel(model);
  };

  const {
    data,
    isLoading: isLoadingPredictionDisplay,
    isRefetching: isRefetchingPredictionDisplay,
    refetch: refetchPredictionDisplay,
  } = useQuery({
    queryKey: ["Predictions"],
    queryFn: () => getLatestDisplayPredictions(),
    enabled: router.isReady,
  });

  // Track last data to determine if new data was fetched
  const lastData = useMemo(() => data, [data]);

  // Time-based refetching (set to 10 seconds for debugging)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      // console.log(now); // Logs the current time to the console
      // console.log(refetching);
      if (now.getMinutes() === 59 || (now.getMinutes() <= 10 && !refetching)) {
        // Check if the minutes is 50
        // console.log("Refetching at 50th minutes");
        setRefetching(true); // Start refetching
        refetchPredictionDisplay(); // Trigger refetching
      }
    }, 60000); // Check every 1 minute

    // Cleanup on unmount and when refetching state changes
    return () => (clearInterval(intervalId), setRefetching(false));
  }, [refetching, refetchPredictionDisplay]); // Include refetching in the dependency array

  // Stop refetching when new data is available
  useEffect(() => {
    if (refetching && data && data !== lastData) {
      setRefetching(false); // Stop refetching when the new data is different from last data
    }
  }, [data, lastData, refetching]);

  useEffect(() => {
    refetchPredictionDisplay();
  }, [activeModel]);

  const dataPredictionDisplay: SensorPredictionRow[] = useMemo(() => {
    if (!data?.predictions || !latestSensor) return [];

    const predictions = data.predictions;

    return [
      {
        sensor: t("temperature"),
        measured: latestSensor?.temperature.value || 0,
        hour1: predictions.temperature[0],
        hour2: predictions.temperature[1],
        hour3: predictions.temperature[2],
        hour4: predictions.temperature[3],
        hour5: predictions.temperature[4],
        hour6: predictions.temperature[5],
        hour7: predictions.temperature[6],
        hour8: predictions.temperature[7],
      },
      {
        sensor: t("pH"),
        measured: latestSensor?.pH.value || 0,
        hour1: predictions.pH[0],
        hour2: predictions.pH[1],
        hour3: predictions.pH[2],
        hour4: predictions.pH[3],
        hour5: predictions.pH[4],
        hour6: predictions.pH[5],
        hour7: predictions.pH[6],
        hour8: predictions.pH[7],
      },
      {
        sensor: t("oxygen"),
        measured: latestSensor?.oxygen.value || 0,
        hour1: predictions.oxygen[0],
        hour2: predictions.oxygen[1],
        hour3: predictions.oxygen[2],
        hour4: predictions.oxygen[3],
        hour5: predictions.oxygen[4],
        hour6: predictions.oxygen[5],
        hour7: predictions.oxygen[6],
        hour8: predictions.oxygen[7],
      },
      {
        sensor: t("conductivity"),
        hour1: predictions.conductivity[0],
        measured: latestSensor?.conductivity.value || 0,
        hour2: predictions.conductivity[1],
        hour3: predictions.conductivity[2],
        hour4: predictions.conductivity[3],
        hour5: predictions.conductivity[4],
        hour6: predictions.conductivity[5],
        hour7: predictions.conductivity[6],
        hour8: predictions.conductivity[7],
      },
      {
        sensor: t("ppm"),
        measured: latestSensor?.ppm.value || 0,
        hour1: predictions.ppm[0],
        hour2: predictions.ppm[1],
        hour3: predictions.ppm[2],
        hour4: predictions.ppm[3],
        hour5: predictions.ppm[4],
        hour6: predictions.ppm[5],
        hour7: predictions.ppm[6],
        hour8: predictions.ppm[7],
      },
      {
        sensor: t("pm25"),
        measured: latestSensor?.pm25.value || 0,
        hour1: predictions.pm25[0],
        hour2: predictions.pm25[1],
        hour3: predictions.pm25[2],
        hour4: predictions.pm25[3],
        hour5: predictions.pm25[4],
        hour6: predictions.pm25[5],
        hour7: predictions.pm25[6],
        hour8: predictions.pm25[7],
      },
    ];
  }, [data, latestSensor, t]);

  const measuredTime = useMemo(() => {
    if (!latestSensor) return null;

    return latestSensor.createdAt.value;
  }, [latestSensor]);

  const predictionTime = useMemo(() => {
    if (!data) return "";

    return formatISOTimeWithDate(convertToTaiwanTime(data.timestamp));
  }, [data]);

  return {
    activeModel,
    handleChangeActiveModel,
    setActiveModel,
    dataPredictionDisplay,
    predictionTime,
    latestSensor,
    measuredTime,
    isLoadingPredictionDisplay,
    isRefetchingPredictionDisplay,
    refetchPredictionDisplay,
  };
};

export default usePrediction;
