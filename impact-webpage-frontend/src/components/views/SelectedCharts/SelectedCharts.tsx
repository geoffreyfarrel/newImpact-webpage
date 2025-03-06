import ChartCard from "@/components/ui/Charts";
import useSelectedCharts from "./useSelectedCharts";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { useDateFormatter } from "@react-aria/i18n";
import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import { CHART_LIMIT_LISTS } from "@/constants/chart.constants";

const SelectedCharts = () => {
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(
    null,
  );
  const [limit, setLimit] = useState(30);

  let formatter = useDateFormatter({ dateStyle: "short" });

  const temperatureCharts = useSelectedCharts("temperature");
  return (
    <>
      <PageTitle title="Selected Charts" />
      <form>
        <DateRangePicker
          className="max-w-72"
          value={dateRange}
          onChange={setDateRange}
        />
        <Select
          className="hidden max-w-36 lg:block"
          classNames={{
            label: "dark:text-white",
            trigger: "dark:bg-primary-900 ",
            popoverContent: "dark:bg-primary-900",
          }}
          size="md"
          selectedKeys={[String(limit)]}
          selectionMode="single"
          // onChange={}
          startContent={<p className="text-small">Show:</p>}
          disallowEmptySelection
        >
          {CHART_LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <p>StartDate: {dateRange?.start.toString()}</p>
        <p>EndDate: {dateRange?.end.toString()}</p>
        <Button type="submit">Submit</Button>
      </form>
      {/* <ChartCard title="Temperature" colorPallete={} currentSensor="temperature"  /> */}
    </>
  );
};

export default SelectedCharts;
