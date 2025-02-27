import { cn } from "@/utils/cn";
import { Card, CardBody, Skeleton } from "@heroui/react";
import useSensorCard from "./useSensorCard";
import { MappedSensorData } from "@/types/Sensor";

interface PropTypes {
  isLoading: boolean;
  isTimeCard?: boolean;
  sensorName: string;
  sensorType: string;
  isIndicator?: boolean;
}

const SensorCard = (props: PropTypes) => {
  const { isIndicator, isLoading, isTimeCard, sensorName, sensorType } = props;

  const { latestSensor } = useSensorCard();
  console.log("Latest sensor data: ", latestSensor);

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
        <Card
          className={cn("flex h-full flex-col border-l-4 dark:bg-primary-800", {
            "border-x-0 border-y-3 border-teal-500 dark:border-teal-500/70":
              sensorType === "createdAt",
            "border-red-600/80": sensorType === "temperature",
            "border-orange-400/80": sensorType === "pH",
            "border-amber-400/80": sensorType === "oxygen",
            "border-green-600/80": sensorType === "conductivity",
            "border-sky-500/80": sensorType === "ppm",
            "border-purple-600/80": sensorType === "pm25",
          })}
        >
          <CardBody
            className={cn(
              "",
              { "text-center": isTimeCard },
              {
                "m-2 flex w-full flex-row justify-between px-6 py-4":
                  !isTimeCard,
              },
            )}
          >
            <div className="flex flex-col">
              {!isTimeCard && (
                <h3
                  className={cn(
                    "text-sm font-semibold uppercase md:text-base lg:text-xl",
                  )}
                >
                  {sensorName}
                </h3>
              )}
              <h4 className="text-lg">
                {latestSensor?.[sensorType as keyof MappedSensorData].value}
              </h4>
            </div>
            {isIndicator && (
              <div className="flex flex-col text-right">
                <h4 className="text-sm font-semibold md:text-base lg:text-xl">
                  {
                    latestSensor?.[sensorType as keyof MappedSensorData]
                      .indicator
                  }
                </h4>
                <h4 className="text-base">
                  {latestSensor?.[sensorType as keyof MappedSensorData].color}
                </h4>
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default SensorCard;
