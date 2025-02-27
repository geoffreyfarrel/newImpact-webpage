import socketServices from "@/services/socket.services";
import { ISensorData, MappedSensorData } from "@/types/Sensor";
import { useEffect, useState } from "react";
import {
  COLOR_PALETTE_SENSOR_CARD,
  INDICATOR_TEXT,
} from "./SensorCard.constant";

const useSensorCard = () => {
  const [latestSensor, setLatestSensor] = useState<MappedSensorData | null>(
    null,
  );

  useEffect(() => {
    const handleNewData = (latestSensorData: { data: ISensorData }) => {
      // console.log("Received latest sensor data: ", latestSensorData.data);

      const mappedData: MappedSensorData = {
        pH: {
          value: latestSensorData?.data?.pH,
          color: COLOR_PALETTE_SENSOR_CARD.pH(latestSensorData?.data?.pH),
          indicator: INDICATOR_TEXT.pH(latestSensorData?.data.pH),
        },
        oxygen: {
          value: latestSensorData?.data.oxygen,
          color: COLOR_PALETTE_SENSOR_CARD.oxygen(
            latestSensorData?.data.oxygen,
          ),
          indicator: INDICATOR_TEXT.oxygen(latestSensorData?.data.oxygen),
        },
        ppm: {
          value: latestSensorData.data.ppm,
          color: COLOR_PALETTE_SENSOR_CARD.ppm(latestSensorData?.data.ppm),
          indicator: INDICATOR_TEXT.ppm(latestSensorData.data.ppm),
        },
        pm25: {
          value: latestSensorData.data.pm25,
          color: COLOR_PALETTE_SENSOR_CARD.pm25(latestSensorData.data.pm25),
          indicator: INDICATOR_TEXT.pm25(latestSensorData.data.pm25),
        },
        createdAt: {
          value: latestSensorData.data.createdAt as string,
          color: undefined,
          indicator: undefined,
        }, // Keep raw timestamp
        temperature: {
          value: latestSensorData.data.temperature,
          color: undefined,
          indicator: undefined,
        }, // Keep raw value
        conductivity: {
          value: latestSensorData.data.conductivity,
          color: undefined,
          indicator: undefined,
        }, // Keep raw value
      };
      setLatestSensor(mappedData);
    };

    socketServices.on("latestSensorData", handleNewData);

    return () => {
      socketServices.off("latestSensorData", handleNewData);
    };
  }, []);

  return { latestSensor };
};

export default useSensorCard;
