import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import chartServices from "@/services/chart.services";
import datatableServices from "@/services/datatable.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

type SensorKey =
  | "temperature"
  | "pH"
  | "conductivity"
  | "oxygen"
  | "ppm"
  | "pm25";

const useAllResult = () => {
  const [pagination, setPagination] = useState({
    temperature: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    pH: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    conductivity: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    oxygen: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    ppm: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
    pm25: { page: PAGE_DEFAULT, limit: LIMIT_DEFAULT },
  });

  const router = useRouter();

  const currentStartDate = router.query.startDate;
  const currentEndDate = router.query.endDate;

  const getAllDataTable = async (sensor: SensorKey) => {
    const { page, limit } = pagination[sensor];

    let params = `limit=${limit}&page=${page}`;
    if (currentStartDate && currentEndDate) {
      params += `&startDate=${currentStartDate}&endDate=${currentEndDate}`;
    }

    const res = await datatableServices.getAllDataTable(params);
    const { data } = res;
    return data;
  };

  const queries = {
    temperature: useQuery({
      queryKey: [
        "temperatureData",
        pagination.temperature.page, // ✅ Included in queryKey
        pagination.temperature.limit, // ✅ Included in queryKey
      ],
      queryFn: () => getAllDataTable("temperature"),
      placeholderData: keepPreviousData,
    }),
    pH: useQuery({
      queryKey: [
        "pHData",
        pagination.pH.page, // ✅ Included in queryKey
        pagination.pH.limit, // ✅ Included in queryKey
      ],
      queryFn: () => getAllDataTable("pH"),
      placeholderData: keepPreviousData,
      // 🚨 Removed the `enabled` property
    }),
    conductivity: useQuery({
      queryKey: [
        "conductivityData",
        pagination.conductivity.page, // ✅ Included in queryKey
        pagination.conductivity.limit, // ✅ Included in queryKey
      ],
      queryFn: () => getAllDataTable("conductivity"),
      placeholderData: keepPreviousData,
    }),
    oxygen: useQuery({
      queryKey: [
        "oxygenData",
        pagination.oxygen.page, // ✅ Included in queryKey
        pagination.oxygen.limit, // ✅ Included in queryKey
      ],
      queryFn: () => getAllDataTable("oxygen"),
      placeholderData: keepPreviousData,
    }),
    ppm: useQuery({
      queryKey: [
        "ppmData",
        pagination.ppm.page, // ✅ Included in queryKey
        pagination.ppm.limit, // ✅ Included in queryKey
      ],
      queryFn: () => getAllDataTable("ppm"),
      placeholderData: keepPreviousData,
    }),
    pm25: useQuery({
      queryKey: [
        "pm25Data",
        pagination.pm25.page, // ✅ Included in queryKey
        pagination.pm25.limit, // ✅ Included in queryKey
      ],
      queryFn: () => getAllDataTable("pm25"),
      placeholderData: keepPreviousData,
    }),
  };

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

  const handleChangeLimit = (sensorType: SensorKey, newLimit: number) => {
    // console.log(`Changing limit for ${sensorType} to ${newLimit}`); // Debugging
    setPagination((prev) => ({
      ...prev,
      [sensorType]: {
        ...prev[sensorType],
        limit: newLimit, // ✅ Update only the selected sensor’s limit
      },
    }));
  };

  return {
    pagination,
    queries,
    handleChangePage,
    handleChangeLimit,
  };
};

export default useAllResult;
