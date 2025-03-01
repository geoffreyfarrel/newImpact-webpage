import {
  Divider,
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import useDataTable from "./useDataTable";
import { formatISOTimeWithDate } from "@/utils/timeFormatter";
import { useState } from "react";
import { useTheme } from "next-themes";

interface PropTypes {
  title: string;
  sensorDescription: string;
  sensorType: string;
}

const DataTable = (props: PropTypes) => {
  const { title, sensorDescription, sensorType } = props;
  const { latestDataTableData, page, setPage, limit, setLimit, totalPages } =
    useDataTable();
  const { theme } = useTheme();

  console.log("latestDataTable: ", latestDataTableData);
  return (
    <div className="mb-8">
      <Table
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
        bottomContent={
          <div className="flex w-full justify-end">
            <Pagination
              classNames={{
                item: "dark:bg-primary-900",
                cursor: "bg-teal-500 dark:bg-primary-500",
                next: "dark:bg-primary-900",
                prev: "dark:bg-primary-900",
              }}
              isCompact
              showControls
              showShadow
              page={1}
              total={5}
              // variant="light"
              onChange={setPage}
            />
          </div>
        }
        removeWrapper
      >
        <TableHeader>
          <TableColumn className="text-center text-sm dark:bg-primary-400/25 dark:text-white">
            Measurement Time (UTC+8)
          </TableColumn>
          <TableColumn className="text-center text-sm dark:bg-primary-400/25 dark:text-white">
            {sensorDescription}
          </TableColumn>
        </TableHeader>
        <TableBody items={latestDataTableData ?? []}>
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
