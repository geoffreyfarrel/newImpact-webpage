import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import { useTranslations } from "next-intl";
import { Fragment, ReactNode, useEffect, useState } from "react";
import usePrediction from "./usePrediction";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { SensorPredictionRow } from "@/types/Prediction";
import usePredictionColumns from "./Prediction.columns.constant";

const Prediction = () => {
  const t = useTranslations();
  const { dataPredictionDisplay, measuredTime, predictionTime } =
    usePrediction();

  const PREDICTIONS_COLUMNS = usePredictionColumns(predictionTime);

  const [mounted, setMounted] = useState(false);
  // Only set mounted state to true once the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a loading spinner or fallback content before mounting
  if (!mounted) {
    return (
      <Card className="h-[300px]">
        <Skeleton className="h-[100%] w-full" />
      </Card>
    );
  }

  return (
    <Fragment>
      <PageTitle title={t("prediction")} />
      <Card className="rounded-lg border-1 dark:border-gray-800 dark:bg-primary-800">
        <CardHeader className="flex flex-col gap-3">
          <div className="w-1/4 justify-start rounded-lg bg-teal-500 p-2 dark:bg-primary-400">
            <h1 className="text-center text-sm font-semibold text-white">
              {t("gru_prediction")}
            </h1>
          </div>
          <Divider />
          <Card className="flex h-full w-full flex-col rounded-md border-x-0 border-y-3 border-teal-500 dark:border-teal-500/70 dark:bg-primary-600">
            <h1 className="m-2 text-center text-sm font-semibold dark:text-white">
              {t("time")}: {measuredTime}
            </h1>
          </Card>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <Table
            aria-label="PredictionTable"
            removeWrapper
            classNames={{
              th: "text-center dark:bg-primary-400/25 dark:text-white text-sm whitespace-pre-line py-2",
            }}
          >
            <TableHeader columns={PREDICTIONS_COLUMNS}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={dataPredictionDisplay ?? []}>
              {(item) => (
                <TableRow key={item.sensor}>
                  {(columnKey) => (
                    <TableCell className="text-center">
                      {
                        item[
                          columnKey as keyof SensorPredictionRow
                        ] as ReactNode
                      }
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Prediction;
