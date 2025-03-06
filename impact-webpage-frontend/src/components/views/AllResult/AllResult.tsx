import PageHead from "@/components/commons/PageHead";
import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import DataTable from "@/components/ui/DataTable";
import getColumns from "@/constants/column.constants";
import { Fragment, useEffect } from "react";
import useAllResult from "./useAllResult";
import { useRouter } from "next/router";

const AllResult = () => {
  const { push, isReady, query } = useRouter();
  const { pagination, queries, handleChangePage, handleChangeLimit } =
    useAllResult();

  console.log(queries.temperature.data);

  return (
    <Fragment>
      <PageTitle title="All Result" />
      <DataTable
        columns={getColumns("temperature")}
        currentPage={pagination.temperature.page}
        data={queries.temperature.data?.data || []}
        isLoading={
          queries.temperature.isLoading || queries.temperature.isRefetching
        }
        limit={pagination.temperature.limit}
        sensorType="temperature"
        sensorDescription="Measured Water Temperature Value (&deg; C)"
        onChangeLimit={(e) =>
          handleChangeLimit("temperature", Number(e.target.value))
        }
        onChangePage={(newPage) => handleChangePage("temperature", newPage)}
        title="Measured Water Temperature Value"
        total={queries.temperature.data?.pagination.total}
        totalPages={queries.temperature.data?.pagination.totalPages}
      />
      <DataTable
        columns={getColumns("pH")}
        currentPage={pagination.pH.page}
        data={queries.pH.data?.data || []}
        isLoading={queries.pH.isLoading || queries.pH.isRefetching}
        limit={pagination.pH.limit}
        sensorType="pH"
        sensorDescription="Measured Acidity (pH)"
        onChangeLimit={(e) => handleChangeLimit("pH", Number(e.target.value))}
        onChangePage={(newPage) => handleChangePage("pH", newPage)}
        title="Measured Water Acidity Value"
        totalPages={queries.pH.data?.pagination.totalPages}
      />
      <DataTable
        columns={getColumns("conductivity")}
        currentPage={pagination.conductivity.page}
        data={queries.conductivity.data?.data || []}
        isLoading={
          queries.conductivity.isLoading || queries.conductivity.isRefetching
        }
        limit={pagination.conductivity.limit}
        sensorType="conductivity"
        sensorDescription="Measured Water Conductivity (S/m)"
        onChangeLimit={(e) =>
          handleChangeLimit("conductivity", Number(e.target.value))
        }
        onChangePage={(newPage) => handleChangePage("conductivity", newPage)}
        title="Measured Water Conductivity Value"
        totalPages={queries.conductivity.data?.pagination.totalPages}
      />
      <DataTable
        columns={getColumns("oxygen")}
        currentPage={pagination.oxygen.page}
        data={queries.oxygen.data?.data || []}
        isLoading={queries.oxygen.isLoading || queries.oxygen.isRefetching}
        limit={pagination.oxygen.limit}
        sensorType="oxygen"
        sensorDescription="Measured Water Dissolved Oxygen (mg/L)"
        onChangeLimit={(e) =>
          handleChangeLimit("oxygen", Number(e.target.value))
        }
        onChangePage={(newPage) => handleChangePage("oxygen", newPage)}
        title="Measured Water Dissolved Oxygen Value"
        totalPages={queries.oxygen.data?.pagination.totalPages}
      />
      <DataTable
        columns={getColumns("ppm")}
        currentPage={pagination.ppm.page}
        data={queries.ppm.data?.data || []}
        isLoading={queries.ppm.isLoading || queries.ppm.isRefetching}
        limit={pagination.ppm.limit}
        sensorType="ppm"
        sensorDescription="Measured Water Dissolved Solid (ppm)"
        onChangeLimit={(e) => handleChangeLimit("ppm", Number(e.target.value))}
        onChangePage={(newPage) => handleChangePage("ppm", newPage)}
        title="Measured Water Dissolved Solid Value"
        totalPages={queries.ppm.data?.pagination.totalPages}
      />
      <DataTable
        columns={getColumns("pm25")}
        currentPage={pagination.pm25.page}
        data={queries.pm25.data?.data || []}
        isLoading={queries.pm25.isLoading || queries.pm25.isRefetching}
        limit={pagination.pm25.limit}
        sensorType="pm25"
        sensorDescription="Measured PM2.5 (Air Pollution) (&mu;g/m&sup3;)"
        onChangeLimit={(e) => handleChangeLimit("pm25", Number(e.target.value))}
        onChangePage={(newPage) => handleChangePage("pm25", newPage)}
        title="Measured PM2.5 (Air Pollution) Value"
        totalPages={queries.pm25.data?.pagination.totalPages}
      />
    </Fragment>
  );
};

export default AllResult;
