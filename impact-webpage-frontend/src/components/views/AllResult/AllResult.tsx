import PageHead from "@/components/commons/PageHead";
import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import DataTable from "@/components/ui/DataTable";
import getColumns from "@/constants/column.constants";
import { Fragment } from "react";
import useAllResult from "./useAllResult";
import { useRouter } from "next/router";
import { Button, DateRangePicker, DateValue, RangeValue } from "@heroui/react";
import { SENSORS } from "./AllResult.constanst";
import { useTranslations } from "next-intl";

const AllResult = ({ messages }: { messages: Record<string, string> }) => {
  const t = useTranslations();
  const { push, isReady, query } = useRouter();
  const {
    pagination,
    dateRanges,
    queries,
    handleChangePage,
    handleChangeLimit,
    handleChangeDateRange,
  } = useAllResult();

  return (
    <Fragment>
      <PageTitle title={t("all_result")} />

      {SENSORS.map(({ key, title, description }) => (
        <div key={key} className="mb-8 border-b border-gray-300 p-4">
          <div className="flex flex-row gap-2">
            {/* Date Picker above each table */}
            <div className="mb-4">
              <DateRangePicker
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
