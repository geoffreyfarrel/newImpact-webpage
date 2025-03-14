import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import DataTable from "@/components/ui/DataTable";
import getColumns from "@/constants/column.constants";
import { Fragment } from "react";
import useAllResult from "./useAllResult";
import { Button, DateRangePicker } from "@heroui/react";
import { useTranslations } from "next-intl";
import useGetSensors from "./AllResult.constanst";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AllResult = () => {
  const t = useTranslations();
  const {
    pagination,
    dateRanges,
    queries,
    handleChangePage,
    handleChangeLimit,
    handleChangeDateRange,
  } = useAllResult();

  const sensors = useGetSensors();

  return (
    <Fragment>
      <PageTitle title={t("all_result")} />

      {sensors.map(({ key, title, description }) => (
        <div key={key} className="mb-8 border-b border-gray-300 p-4">
          <div className="flex flex-row gap-2">
            {/* Date Picker above each table */}
            <div className="mb-4">
              <DateRangePicker
                aria-label="Select Date Range"
                className="max-w-72"
                value={dateRanges[key] || null}
                onChange={(newRange) => handleChangeDateRange(key, newRange)}
              />
            </div>
            {dateRanges[key] && (
              <Button
                className="rounded-md border-teal-400 text-teal-500 dark:border-primary-100 dark:text-primary-100"
                variant="bordered"
                onPress={() => handleChangeDateRange(key, null)}
              >
                {t("clear")}
              </Button>
            )}
          </div>

          {/* Data Table */}
          <DataTable
            columns={getColumns(key)}
            currentPage={pagination[key].page}
            data={queries[key].data?.data || []}
            isLoading={queries[key].isLoading || queries[key].isRefetching}
            limit={pagination[key].limit}
            sensorType={key}
            sensorDescription={description}
            onChangeLimit={(e) =>
              handleChangeLimit(key, Number(e.target.value))
            }
            onChangePage={(newPage) => handleChangePage(key, newPage)}
            title={title}
            totalPages={queries[key].data?.pagination.totalPages}
            total={queries[key].data?.pagination.total}
          />
        </div>
      ))}
    </Fragment>
  );
};

export default AllResult;
