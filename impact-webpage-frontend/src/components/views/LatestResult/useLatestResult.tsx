import { PAGE_DEFAULT } from "@/constants/chart.constants";
import { LIMIT_DEFAULT } from "@/constants/list.constants";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useMemo, useState } from "react";

const TOTAL_ENTRIES = 50;

type SensorKey =
  | "temperature"
  | "pH"
  | "conductivity"
  | "oxygen"
  | "ppm"
  | "pm25";

const useLatestResult = () => {
  const { latestDataTable } = useWebSocket();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    temperature: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    pH: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    conductivity: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    oxygen: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    ppm: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    pm25: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
  });
  const [limit, setLimit] = useState(LIMIT_DEFAULT);
  const totalPages = useMemo(() => Math.ceil(TOTAL_ENTRIES / limit), [limit]);

  const temperatureDataTableData = useMemo(() => {
    if (!latestDataTable?.data) return [];
    return latestDataTable.data.slice(
      (pagination.temperature.page - 1) * pagination.temperature.limit,
      pagination.temperature.page * pagination.temperature.limit,
    );
  }, [
    latestDataTable,
    pagination.temperature.page,
    pagination.temperature.limit,
  ]);
  const pHDataTableData = useMemo(() => {
    if (!latestDataTable?.data) return [];
    return latestDataTable.data.slice(
      (pagination.pH.page - 1) * pagination.pH.limit,
      pagination.pH.page * pagination.pH.limit,
    );
  }, [latestDataTable, pagination.pH.page, pagination.pH.limit]);
  const conductivityDataTableData = useMemo(() => {
    if (!latestDataTable?.data) return [];
    return latestDataTable.data.slice(
      (pagination.conductivity.page - 1) * pagination.conductivity.limit,
      pagination.conductivity.page * pagination.conductivity.limit,
    );
  }, [
    latestDataTable,
    pagination.conductivity.page,
    pagination.conductivity.limit,
  ]);
  const oxygenDataTableData = useMemo(() => {
    if (!latestDataTable?.data) return [];
    return latestDataTable.data.slice(
      (pagination.oxygen.page - 1) * pagination.oxygen.limit,
      pagination.oxygen.page * pagination.oxygen.limit,
    );
  }, [latestDataTable, pagination.oxygen.page, pagination.oxygen.limit]);
  const ppmDataTableData = useMemo(() => {
    if (!latestDataTable?.data) return [];
    return latestDataTable.data.slice(
      (pagination.ppm.page - 1) * pagination.ppm.limit,
      pagination.ppm.page * pagination.ppm.limit,
    );
  }, [latestDataTable, pagination.ppm.page, pagination.ppm.limit]);
  const pm25DataTableData = useMemo(() => {
    if (!latestDataTable?.data) return [];
    return latestDataTable.data.slice(
      (pagination.pm25.page - 1) * pagination.pm25.limit,
      pagination.pm25.page * pagination.pm25.limit,
    );
  }, [latestDataTable, pagination.pm25.page, pagination.pm25.limit]);

  const handleChangePage = (sensorType: SensorKey, newPage: number) => {
    // console.log(`Changing page for ${sensorType} to ${newPage}`); // Debugging
    setPagination((prev) => ({
      ...prev,
      [sensorType]: {
        ...prev[sensorType],
        page: newPage,
      },
    }));
  };

  return {
    temperatureDataTableData,
    pHDataTableData,
    conductivityDataTableData,
    oxygenDataTableData,
    ppmDataTableData,
    pm25DataTableData,
    pagination,
    handleChangePage,
    page,
    setPage,
    limit,
    setLimit,
    totalPages,
  };
};

export default useLatestResult;
