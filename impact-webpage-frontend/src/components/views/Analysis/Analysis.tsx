import BoxPlotChart from "@/components/ui/BoxPlotChart";
import useAnalysis from "./useAnalysis";
import { useTranslations } from "next-intl";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Analysis = ({ messages }: { messages: Record<string, string> }) => {
  const t = useTranslations();
  const { boxplotData, isLoadingBoxplot, isRefetchingBoxplot } = useAnalysis();
  return (
    <>
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="temperature"
        title={t("temperature_boxplot")}
        label={t("temperature").toUpperCase()}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="pH"
        title={t("acidity_boxplot")}
        label={t("pH").toUpperCase()}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="conductivity"
        title={t("conductivity_boxplot")}
        label={t("conductivity").toUpperCase()}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="oxygen"
        title={t("oxygen_boxplot")}
        label={t("oxygen").toUpperCase()}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="ppm"
        title={t("ppm_boxplot")}
        label={t("ppm").toUpperCase()}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="pm25"
        title={t("pm25_boxplot")}
        label={t("pm25").toUpperCase()}
      />
    </>
  );
};

export default Analysis;
