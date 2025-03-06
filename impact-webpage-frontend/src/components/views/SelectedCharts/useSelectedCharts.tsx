import { COLOR_PALETTE_CHART } from "@/components/ui/Charts/ChartCard.constant";
import chartServices from "@/services/chart.services";
import { useQuery } from "@tanstack/react-query";
import { color } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, useMemo } from "react";

const useSelectedCharts = (currentSensor: string) => {
  const router = useRouter();

  const currentStartDate = router.query.startDate;
  const currentEndDate = router.query.endDate;

  const setURL = () => {
    router.replace({
      query: {
        startDate: currentStartDate,
        endDate: currentEndDate,
      },
    });
  };

  const getSelectedCharts = async () => {
    let params = "";
    if (currentStartDate && currentEndDate) {
      params += `startDate=${currentStartDate}&endDate=${currentEndDate}`;
    }

    const res = await chartServices.getSelectedChart(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataSelectedCharts,
    isLoading: isLoadingSelectedCharts,
    isRefetching: isRefetchingSelectedCharts,
  } = useQuery({
    queryKey: ["SelectedCharts", currentStartDate, currentEndDate],
    queryFn: () => getSelectedCharts(),
    enabled: router.isReady,
  });

  const colorPallete = useMemo(() => {
    if (!dataSelectedCharts) return COLOR_PALETTE_CHART.default([]);

    return COLOR_PALETTE_CHART[
      currentSensor as keyof typeof COLOR_PALETTE_CHART
    ]
      ? COLOR_PALETTE_CHART[currentSensor as keyof typeof COLOR_PALETTE_CHART](
          dataSelectedCharts?.data
            .map((item: Record<string, unknown>) =>
              Number(item[currentSensor as keyof typeof item]),
            ) // Convert values to numbers
            .filter((value: number) => !isNaN(value)), // Remove NaN values
        )
      : COLOR_PALETTE_CHART.default(
          dataSelectedCharts?.data?.map(() => 0) || [],
        );
  }, [dataSelectedCharts, currentSensor]);

  const handleChangeChartLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
      },
    });
  };

  return {
    dataSelectedCharts,
    isLoadingSelectedCharts,
    isRefetchingSelectedCharts,
    setURL,
    handleChangeChartLimit,
  };
};

export default useSelectedCharts;
