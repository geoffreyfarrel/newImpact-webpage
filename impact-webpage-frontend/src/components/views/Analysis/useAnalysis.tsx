import chartServices from "@/services/chart.services";
import { useQuery } from "@tanstack/react-query";

const useAnalysis = () => {
  const getBoxplotData = async () => {
    const res = await chartServices.getBoxPlotChart();
    return res.data.data;
  };

  const {
    data: boxplotData,
    isLoading: isLoadingBoxplot,
    isRefetching: isRefetchingBoxplot,
  } = useQuery({ queryKey: ["boxplot"], queryFn: () => getBoxplotData() });

  return {
    boxplotData,
    isLoadingBoxplot,
    isRefetchingBoxplot,
  };
};

export default useAnalysis;
