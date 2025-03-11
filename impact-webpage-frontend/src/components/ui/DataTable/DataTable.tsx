import {
  Divider,
  getKeyValue,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { formatISOTimeWithDate } from "@/utils/timeFormatter";
import { ChangeEvent, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { ISensorData } from "@/types/Sensor";
import { LIMIT_LISTS } from "@/constants/list.constants";

interface PropTypes {
  columns: { key: string; label: string }[];
  currentPage: number;
  data: ISensorData[];
  isLoading?: boolean;
  limit: number;
  sensorDescription: string;
  sensorType: string;
  total?: number;
  totalPages: number;
  onChangeLimit?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  title: string;
}

const DataTable = (props: PropTypes) => {
  const {
    columns,
    currentPage,
    data,
    isLoading,
    limit,
    sensorDescription,
    sensorType,
    total,
    totalPages,
    onChangeLimit,
    onChangePage,
    title,
  } = props;
  const { theme } = useTheme();

  const BottomContent = useMemo(() => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 text-center lg:flex-row lg:justify-between lg:gap-0">
        <div className="w-full lg:w-1/2">
          {onChangeLimit && (
            <section>
              <Select
                aria-label="Select Limit"
                className="mb-4 hidden max-w-32 lg:block"
                classNames={{
                  label: "dark:text-white",
                  trigger: "dark:bg-primary-900 ",
                  popoverContent: "dark:bg-primary-900",
                }}
                size="md"
                selectedKeys={[String(limit)]}
                selectionMode="single"
                onChange={onChangeLimit}
                startContent={<p className="text-small">Show:</p>}
                disallowEmptySelection
              >
                {LIMIT_LISTS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <p className="text-center text-base lg:text-start">
                Showing: {limit} entries from {total} entries
              </p>
            </section>
          )}
        </div>
        <Pagination
          aria-label="Table navigation"
          classNames={{
            item: "dark:bg-primary-900",
            cursor: "bg-teal-500 dark:bg-primary-500",
            next: "dark:bg-primary-900",
            prev: "dark:bg-primary-900",
          }}
          isCompact
          showControls
          showShadow
          page={currentPage}
          total={totalPages}
          onChange={onChangePage}
          siblings={1} // Show 1 page before & after current page
          boundaries={1} // Show first & last page numbers
        />
      </div>
    );
  }, [limit, currentPage, totalPages, onChangeLimit, onChangePage]);

  return (
    <div className="mb-8">
      <Table
        aria-label="DataTable"
        className="rounded-lg border-1 p-4 shadow-md dark:border-gray-800 dark:bg-primary-800"
        topContent={
          <>
            <div className="flex">
              <div className="rounded-br-xl rounded-tl-xl bg-teal-500 p-2 dark:bg-primary-400">
                <h1 className="text-sm font-semibold text-white">{title}</h1>
              </div>
            </div>
            <Divider />
          </>
        }
        bottomContent={BottomContent}
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="w-1/2 min-w-0 whitespace-normal break-words text-center text-sm dark:bg-primary-400/25 dark:text-white">
            Measurement Time (UTC+8)
          </TableColumn>
          <TableColumn className="w-1/2 min-w-0 whitespace-normal break-words text-center text-sm dark:bg-primary-400/25 dark:text-white">
            {sensorDescription}
          </TableColumn>
        </TableHeader>

        <TableBody
          emptyContent="Table is Empty"
          isLoading={isLoading}
          items={data ?? []}
          loadingContent={
            <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
              <Spinner color={theme === "dark" ? "primary" : "success"} />
            </div>
          }
        >
          {(row) => (
            <TableRow key={row?._id}>
              <TableCell className="text-center">
                {formatISOTimeWithDate(row.createdAt)}
              </TableCell>
              <TableCell className="text-center">{row[sensorType]}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
