import BoxPlotChart from "@/components/ui/BoxPlotChart";
import { Card, CardHeader } from "@heroui/react";
import useAnalysis from "./useAnalysis";

const Analysis = () => {
  const { boxplotData, isLoadingBoxplot, isRefetchingBoxplot } = useAnalysis();
  //   console.log(boxplotData);
  return (
    <>
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="temperature"
        title="Monthly Temperature BoxPlot Chart"
        label="Water Temperature"
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="pH"
        title="Monthly Acidity BoxPlot Chart"
        label="Acidity"
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="conductivity"
        title="Monthly Conductivity BoxPlot Chart"
        label="Conductivity"
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="oxygen"
        title="Monthly Dissolved Oxygen BoxPlot Chart"
        label="Dissolved Oxygen"
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="ppm"
        title="Monthly Dissolved Solid BoxPlot Chart"
        label="Dissolved Solid"
      />
      <BoxPlotChart
        boxplotData={boxplotData}
        isLoading={isLoadingBoxplot}
        isRefetching={isRefetchingBoxplot}
        sensorType="pm25"
        title="Monthly PM2.5 (Air Pollution) BoxPlot Chart"
        label="PM2.5 (Air Pollution)"
      />
    </>
  );
};

export default Analysis;
