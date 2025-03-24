import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import { useTranslations } from "next-intl";

const usePredictionColumns = (predictionTime: string) => {
  const t = useTranslations();

  const calculatePredictionTime = (hoursToAdd: number) => {
    if (predictionTime === "") return "";

    const multiplier = hoursToAdd * 60;
    const predictionDisplay = new Date(predictionTime);
    return formatISOTimeWithDate(
      convertToTaiwanTime(
        new Date(predictionDisplay.getTime() + multiplier * 60 * 1000),
      ),
    ); // Format as yyyy-mm-dd hh:mm
  };

  // Define columns with translations
  const PREDICTIONS_COLUMNS = [
    { key: "sensor", label: t("sensor") },
    {
      key: "measured",
      label: t("measured_value"),
    },
    {
      key: "hour1",
      label: `${t("1hour")}\n${calculatePredictionTime(0)}`,
    },
    { key: "hour2", label: `${t("2hour")}\n${calculatePredictionTime(1)}` },
    { key: "hour3", label: `${t("3hour")}\n${calculatePredictionTime(2)}` },
    { key: "hour4", label: `${t("4hour")}\n${calculatePredictionTime(3)}` },
    { key: "hour5", label: `${t("5hour")}\n${calculatePredictionTime(4)}` },
    { key: "hour6", label: `${t("6hour")}\n${calculatePredictionTime(5)}` },
    { key: "hour7", label: `${t("7hour")}\n${calculatePredictionTime(6)}` },
    { key: "hour8", label: `${t("8hour")}\n${calculatePredictionTime(7)}` },
  ];

  return PREDICTIONS_COLUMNS;
};

export default usePredictionColumns;
