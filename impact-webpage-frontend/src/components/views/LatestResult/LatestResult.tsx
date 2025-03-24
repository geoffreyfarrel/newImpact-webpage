import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import DataTable from "@/components/ui/DataTable";
import { Fragment, useEffect, useState } from "react";
import useLatestResult from "./useLatestResult";
import getColumns from "@/constants/column.constants";
import { useTranslations } from "next-intl";
import { Card, Skeleton } from "@heroui/react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LatestResult = () => {
  const t = useTranslations();
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
    totalPages,
  } = useLatestResult();

  const [mounted, setMounted] = useState(false);
  // Only set mounted state to true once the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="h-screen">
        <Skeleton className="h-[100%] w-full" />
      </Card>
    );
  }

  return (
    <Fragment>
      <PageTitle title={t("latest_result")} />
      <DataTable
        columns={getColumns("temperature")}
        currentPage={page}
        data={temperatureDataTableData}
        limit={pagination.temperature.limit}
        isLoading={temperatureDataTableData.length === 0 ? true : false}
        sensorType="temperature"
        sensorDescription={t("measured_temperature")}
        onChangePage={(newPage) => handleChangePage("temperature", newPage)}
        title={t("temperature_table_title")}
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("pH")}
        currentPage={page}
        data={pHDataTableData}
        limit={pagination.pH.limit}
        isLoading={pHDataTableData.length === 0 ? true : false}
        sensorType="pH"
        sensorDescription={t("measured_acidity")}
        onChangePage={(newPage) => handleChangePage("pH", newPage)}
        title={t("acidity_table_title")}
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("conductivity")}
        currentPage={page}
        data={conductivityDataTableData}
        limit={pagination.conductivity.limit}
        isLoading={conductivityDataTableData.length === 0 ? true : false}
        sensorType="conductivity"
        sensorDescription={t("measured_conductivity")}
        onChangePage={(newPage) => handleChangePage("conductivity", newPage)}
        title={t("conductivity_table_title")}
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("oxygen")}
        currentPage={page}
        data={oxygenDataTableData}
        limit={pagination.oxygen.limit}
        isLoading={oxygenDataTableData.length === 0 ? true : false}
        sensorType="oxygen"
        sensorDescription={t("measured_oxygen")}
        onChangePage={(newPage) => handleChangePage("oxygen", newPage)}
        title={t("oxygen_table_title")}
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("ppm")}
        currentPage={page}
        data={ppmDataTableData}
        limit={pagination.ppm.limit}
        isLoading={ppmDataTableData.length === 0 ? true : false}
        sensorType="ppm"
        sensorDescription={t("measured_ppm")}
        onChangePage={(newPage) => handleChangePage("ppm", newPage)}
        title={t("ppm_table_title")}
        totalPages={totalPages}
      />
      <DataTable
        columns={getColumns("pm25")}
        currentPage={page}
        data={pm25DataTableData}
        limit={pagination.pm25.limit}
        isLoading={pm25DataTableData.length === 0 ? true : false}
        sensorType="pm25"
        sensorDescription={t("measured_pm25")}
        onChangePage={(newPage) => handleChangePage("pm25", newPage)}
        title={t("pm25_table_title")}
        totalPages={totalPages}
      />
    </Fragment>
  );
};

export default LatestResult;
