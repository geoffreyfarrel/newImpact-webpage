import { LIMIT_DEFAULT } from "@/constants/list.constants";
import socketServices from "@/services/socket.services";
import { ISensorData } from "@/types/Sensor";
import { useEffect, useMemo, useState } from "react";

const TOTAL_ENTRIES = 50;

const useDataTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(LIMIT_DEFAULT);
  const totalPages = useMemo(() => Math.ceil(TOTAL_ENTRIES / limit), [limit]);
  const [latestDataTable, setLatestDataTable] = useState<{
    data: ISensorData[];
  } | null>(null);

  const latestDataTableData = useMemo(() => {
    if (!latestDataTable?.data) return [];
    return latestDataTable.data.slice((page - 1) * limit, page * limit);
  }, [latestDataTable, page, limit]);

  useEffect(() => {
    const handleNewData = (newData: { data: ISensorData[] }) => {
      //   console.log(newData);
      setLatestDataTable(newData);
    };

    socketServices.on("LatestDataTableData", handleNewData);

    return () => {
      socketServices.off("LatestDataTableData", handleNewData);
    };
  }, []);

  //   useEffect()

  return { latestDataTableData, page, setPage, limit, setLimit, totalPages };
};

export default useDataTable;
