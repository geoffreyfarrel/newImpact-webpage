import ChartCard from "@/components/ui/Charts";
import useSelectedCharts from "./useSelectedCharts";
import { Button, DateRangePicker, Select, SelectItem } from "@heroui/react";
import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import { CHART_LIMIT_LISTS } from "@/constants/chart.constants";
import { useTranslations } from "next-intl";

const SelectedCharts = ({ messages }: { messages: Record<string, string> }) => {
  const t = useTranslations();
  const {
    getColorPallete,
    dateRange,
    dataSelectedCharts,
    setDateRange,
    limit,
    setLimit,
    handleSubmit,
    handleChangeChartLimit,
  } = useSelectedCharts();

  return (
    <>
      <PageTitle title={t("charts")} />
      <form onSubmit={handleSubmit} method="GET">
        <div className="mb-4 flex flex-col justify-center gap-4 md:flex-row lg:justify-start">
          <DateRangePicker
            aria-label="Date Range Picker"
            className="max-w-72"
            classNames={{
              input: "text-black dark:text-white",
              inputWrapper: "dark:bg-gray-500/30",
              selectorIcon: "dark:text-white",
            }}
            value={dateRange}
            onChange={setDateRange}
          />
          <Select
            aria-label="Select Limit"
            className="hidden max-w-36 lg:block"
            classNames={{
              label: "dark:text-white",
              trigger: "dark:bg-primary-900 ",
              popoverContent: "dark:bg-primary-900",
            }}
            size="md"
            selectionMode="single"
            selectedKeys={[String(limit)]}
            startContent={<p className="text-small">Show:</p>}
            onChange={handleChangeChartLimit}
            disallowEmptySelection
          >
            {CHART_LIMIT_LISTS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <Button
            className="max-w-1 bg-teal-500 text-white dark:bg-primary-600"
            variant="solid"
            type="submit"
          >
            {t("submit")}
          </Button>
        </div>

        {dataSelectedCharts && (
          <div>
            <ChartCard
              title={t("temperature")}
              latestChart={dataSelectedCharts}
              colorPallete={getColorPallete("temperature")}
              currentSensor="temperature"
              dateRange={dateRange}
            />
            <ChartCard
              title={t("pH")}
              latestChart={dataSelectedCharts}
              colorPallete={getColorPallete("pH")}
              currentSensor="pH"
              dateRange={dateRange}
            />
            <ChartCard
              title={t("conductivity")}
              latestChart={dataSelectedCharts}
              colorPallete={getColorPallete("conductivity")}
              currentSensor="conductivity"
              dateRange={dateRange}
            />
            <ChartCard
              title={t("oxygen")}
              latestChart={dataSelectedCharts}
              colorPallete={getColorPallete("oxygen")}
              currentSensor="oxygen"
              dateRange={dateRange}
            />
            <ChartCard
              title={t("ppm")}
              latestChart={dataSelectedCharts}
              colorPallete={getColorPallete("ppm")}
              currentSensor="ppm"
              dateRange={dateRange}
            />
            <ChartCard
              title={t("pm25")}
              latestChart={dataSelectedCharts}
              colorPallete={getColorPallete("pm25")}
              currentSensor="pm25"
              dateRange={dateRange}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default SelectedCharts;
