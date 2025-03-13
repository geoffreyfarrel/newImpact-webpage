import { COLOR_PALETTE_CHART } from "@/components/ui/Charts/ChartCard.constant";
import chartServices from "@/services/chart.services";
import { useMutation } from "@tanstack/react-query";
import { useState, ChangeEvent, FormEvent } from "react";
import { DateValue } from "@internationalized/date";
import { RangeValue } from "@heroui/react";

const useSelectedCharts = () => {
  // Store date range in component state
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(
    null,
  );
  const [limit, setLimit] = useState(50); // Default limit

  // Fetch function for chart data
  const fetchSelectedCharts = async () => {
    if (!dateRange?.start || !dateRange?.end) return null;

    const params = `startDate=${dateRange.start.toString()}&endDate=${dateRange.end.toString()}&limit=${limit}`;
    const res = await chartServices.getSelectedChart(params);
    return res.data;
  };

  // Mutation for fetching data (only runs when triggered)
  const {
    mutate: getCharts,
    data: dataSelectedCharts,
    isPending: isLoadingSelectedCharts,
  } = useMutation({
    mutationFn: fetchSelectedCharts,
  });

  // Handle chart limit selection change (stored in state)
  const handleChangeChartLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  // Handle form submission (triggers fetching)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateRange?.start || !dateRange?.end) return;

    getCharts(); // Triggers the mutation to fetch data
  };

  // Generate color palettes dynamically for each sensor
  const getColorPallete = (sensorType: string) => {
    if (!dataSelectedCharts?.data) return COLOR_PALETTE_CHART.default([]);

    return COLOR_PALETTE_CHART[sensorType as keyof typeof COLOR_PALETTE_CHART]
      ? COLOR_PALETTE_CHART[sensorType as keyof typeof COLOR_PALETTE_CHART](
          dataSelectedCharts?.data
            .map((item: Record<string, unknown>) => Number(item[sensorType]))
            .filter((value: number) => !isNaN(value)), // Remove NaN values
        )
      : COLOR_PALETTE_CHART.default(
          dataSelectedCharts?.data?.map(() => 0) || [],
        );
  };

  return {
    getColorPallete, // Function to get the color palette per sensor
    dateRange,
    setDateRange,
    limit,
    setLimit,
    dataSelectedCharts,
    isLoadingSelectedCharts,
    handleChangeChartLimit,
    handleSubmit,
  };
};

export default useSelectedCharts;
