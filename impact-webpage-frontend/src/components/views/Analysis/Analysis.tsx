import BoxPlotChart from "@/components/ui/BoxPlotChart";
import { Card, CardHeader } from "@heroui/react";
import useAnalysis from "./useAnalysis";
import { useTranslations } from "next-intl";

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
        label={t("temperature")}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="pH"
        title={t("acidity_boxplot")}
        label={t("pH")}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="conductivity"
        title={t("conductivity_boxplot")}
        label={t("conductivity")}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="oxygen"
        title={t("oxygen_boxplot")}
        label={t("oxygen")}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="ppm"
        title={t("ppm_boxplot")}
        label={t("ppm")}
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="pm25"
        title={t("pm25_boxplot")}
        label={t("pm25")}
      />
    </>
  );
};

export default Analysis;
