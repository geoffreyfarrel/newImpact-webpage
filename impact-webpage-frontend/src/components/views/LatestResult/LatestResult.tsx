import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import Charts from "@/components/ui/Charts";
import DataTable from "@/components/ui/DataTable";
import SensorCard from "@/components/ui/SensorCard";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Fragment, useState } from "react";
import useLatestResult from "./useLatestResult";
import getColumns from "@/constants/column.constants";

const LatestResult = () => {
  const {
    temperatureDataTableData,
    pHDataTableData,
    conductivityDataTableData,
    oxygenDataTableData,
    ppmDataTableData,
    pm25DataTableData,
    page,
    pagination,
    handleChangePage,
    setPage,
    limit,
    setLimit,
    totalPages,
  } = useLatestResult();
  return (
    <Fragment>
      <PageTitle title="Latest Result" />
      <DataTable
        columns={getColumns("temperature")}
        currentPage={page}
        data={temperatureDataTableData}
        limit={pagination.temperature.limit}
        isLoading={temperatureDataTableData.length === 0 ? true : false}
        sensorType="temperature"
        sensorDescription="Measured Water Temperature Value (&deg; C)"
        onChangePage={(newPage) => handleChangePage("temperature", newPage)}
        title="Measured Water Temperature Value"
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("pH")}
        currentPage={page}
        data={pHDataTableData}
        limit={pagination.pH.limit}
        isLoading={pHDataTableData.length === 0 ? true : false}
        sensorType="pH"
        sensorDescription="Measured Acidity (pH)"
        onChangePage={(newPage) => handleChangePage("pH", newPage)}
        title="Measured Water Acidity Value"
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("conductivity")}
        currentPage={page}
        data={conductivityDataTableData}
        limit={pagination.conductivity.limit}
        isLoading={conductivityDataTableData.length === 0 ? true : false}
        sensorType="conductivity"
        sensorDescription="Measured Water Conductivity (S/m)"
        onChangePage={(newPage) => handleChangePage("conductivity", newPage)}
        title="Measured Water Conductivity Value"
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("oxygen")}
        currentPage={page}
        data={oxygenDataTableData}
        limit={pagination.oxygen.limit}
        isLoading={oxygenDataTableData.length === 0 ? true : false}
        sensorType="oxygen"
        sensorDescription="Measured Water Dissolved Oxygen (mg/L)"
        onChangePage={(newPage) => handleChangePage("oxygen", newPage)}
        title="Measured Water Dissolved Oxygen Value"
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("ppm")}
        currentPage={page}
        data={ppmDataTableData}
        limit={pagination.ppm.limit}
        isLoading={ppmDataTableData.length === 0 ? true : false}
        sensorType="ppm"
        sensorDescription="Measured Water Dissolved Solid (ppm)"
        onChangePage={(newPage) => handleChangePage("ppm", newPage)}
        title="Measured Water Dissolved Solid Value"
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("pm25")}
        currentPage={page}
        data={pm25DataTableData}
        limit={pagination.pm25.limit}
        isLoading={pm25DataTableData.length === 0 ? true : false}
        sensorType="pm25"
        sensorDescription="Measured PM2.5 (Air Pollution) (&mu;g/m&sup3;)"
        onChangePage={(newPage) => handleChangePage("pm25", newPage)}
        title="Measured PM2.5 (Air Pollution) Value"
        totalPages={totalPages}
      />
    </Fragment>
  );
};

export default LatestResult;
