/* eslint-disable react-hooks/rules-of-hooks */
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import datatableServices from "@/services/datatable.services";
import { DateValue, RangeValue } from "@heroui/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type SensorKey =
  | "temperature"
  | "pH"
  | "conductivity"
  | "oxygen"
  | "ppm"
  | "pm25";

const useAllResult = () => {
  const [pagination, setPagination] = useState(
    Object.fromEntries(
      ["temperature", "pH", "conductivity", "oxygen", "ppm", "pm25"].map(
        (sensor) => [sensor, { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT }],
      ),
    ),
  );

  const [dateRanges, setDateRanges] = useState(
    Object.fromEntries(
      ["temperature", "pH", "conductivity", "oxygen", "ppm", "pm25"].map(
        (sensor) => [sensor, null as RangeValue<DateValue> | null],
      ),
    ),
  );

  const getAllDataTable = async (sensor: SensorKey) => {
    const { page, limit } = pagination[sensor];
    const dateRange = dateRanges[sensor];

    let params = `limit=${limit}&page=${page}`;
    if (dateRange && dateRange.start && dateRange.end) {
      params += `&startDate=${dateRange.start.toString()}&endDate=${dateRange.end.toString()}`;
    }

    const res = await datatableServices.getAllDataTable(params);
    return res.data;
  };
  const queries = Object.fromEntries(
    (Object.keys(pagination) as SensorKey[]).map((sensor) => [
      sensor,
      useQuery({
        queryKey: [
          `${sensor}Data`,
          pagination[sensor].page,
          pagination[sensor].limit,
          dateRanges[sensor],
        ],
        queryFn: () => getAllDataTable(sensor),
        placeholderData: keepPreviousData,
      }),
    ]),
  );

  const handleChangePage = (sensorType: SensorKey, newPage: number) => {
    setPagination((prev) => ({
      ...prev,
      [sensorType]: { ...prev[sensorType], page: newPage },
    }));
  };

  const handleChangeLimit = (sensorType: SensorKey, newLimit: number) => {
    setPagination((prev) => ({
      ...prev,
      [sensorType]: { ...prev[sensorType], limit: newLimit },
    }));
  };

  const handleChangeDateRange = (
    sensorType: SensorKey,
    newRange: RangeValue<DateValue> | null,
  ) => {
    setDateRanges((prev) => ({
      ...prev,
      [sensorType]: newRange,
    }));
  };

  return {
    pagination,
    dateRanges,
    queries,
    handleChangePage,
    handleChangeLimit,
    handleChangeDateRange,
  };
};

export default useAllResult;
