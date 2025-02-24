import { cn } from "@/utils/cn";
import { Card, CardBody, Skeleton } from "@heroui/react";

interface PropTypes {
  indicatorColor?: string;
  indicatorValue?: string;
  isLoading: boolean;
  isTimeCard?: boolean;
  sensorName: string;
  sensorValue: number | string;
}

const SensorCard = (props: PropTypes) => {
  const {
    indicatorColor,
    indicatorValue,
    isLoading,
    isTimeCard,
    sensorName,
    sensorValue,
  } = props;

  return (
    <div className="my-2">
      {isLoading ? (
        <div
          className={cn("rounded-md bg-gray-300", {
            "w-full": isTimeCard,
          })}
        >
          <Skeleton className="h-[125px] w-full" /> {/* Ensure full width */}
        </div>
      ) : (
        <Card className="dark:bg-primary-800">
          <CardBody
            className={cn(
              "",
              { "text-center": isTimeCard },
              {
                "flex h-[125px] w-full flex-row items-center justify-between p-4 lg:w-[385px]":
                  !isTimeCard,
              },
            )}
          >
            <div className="flex flex-col">
              <h3 className="mb-1 text-xl font-semibold uppercase">
                {sensorName}
              </h3>
              <h4 className="text-lg">{sensorValue}</h4>
            </div>
            {indicatorColor && indicatorValue && (
              <div className="flex flex-col text-right">
                <h4 className="text-xl font-semibold">{indicatorValue}</h4>
                <h4 className="text-lg">{indicatorColor}</h4>
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default SensorCard;
