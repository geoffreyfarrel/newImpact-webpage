import { cn } from "@/utils/cn";
import { Badge, Card, CardBody, Skeleton } from "@heroui/react";
import { ISensorData, MappedSensorData } from "@/types/Sensor";
import { useIndicatorText } from "./SensorCard.constant";

interface PropTypes {
  isTimeCard?: boolean;
  latestSensor: MappedSensorData | null;
  sensorName: string;
  sensorType: string;
  isIndicator?: boolean;
}

const SensorCard = (props: PropTypes) => {
  const indicatorText = useIndicatorText();
  const { isIndicator, isTimeCard, latestSensor, sensorName, sensorType } =
    props;

  const isLoading = !latestSensor;

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
          className={cn("flex h-full flex-col border-l-4 dark:bg-primary-600", {
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
              <h4 className={cn("text-lg", { "font-semibold": isTimeCard })}>
                {latestSensor?.[sensorType as keyof MappedSensorData].value}
              </h4>
            </div>
            {isIndicator && (
              <div className="flex flex-col items-end gap-1 text-right">
                <h4 className="text-sm md:text-base lg:text-xl">
                  {indicatorText[sensorType as keyof typeof indicatorText](
                    Number(
                      latestSensor?.[sensorType as keyof MappedSensorData]
                        .value,
                    ), // ✅ Convert value to number
                  )}
                </h4>
                <div
                  className="h-10 w-10 rounded-full"
                  style={{
                    backgroundColor:
                      latestSensor?.[sensorType as keyof MappedSensorData]
                        .color,
                  }}
                ></div>
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default SensorCard;
