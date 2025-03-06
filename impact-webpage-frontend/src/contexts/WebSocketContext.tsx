import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import getSocket from "@/services/socket.services"; // ✅ Import WebSocket service
import { ISensorData, MappedSensorData } from "@/types/Sensor";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import {
  COLOR_PALETTE_SENSOR_CARD,
  INDICATOR_TEXT,
} from "@/components/ui/SensorCard/SensorCard.constant";

interface WebSocketContextType {
  socket: Socket | null;
  latestDataTable: { data: ISensorData[] } | null;
  setLatestDataTable: (data: { data: ISensorData[] } | null) => void;
  latestChart: { data: ISensorData[] } | null;
  setLatestChart: (data: { data: ISensorData[] } | null) => void;
  latestSensor: MappedSensorData | null;
  setLatestSensor: (data: MappedSensorData | null) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [latestDataTable, setLatestDataTable] = useState<{
    data: ISensorData[];
  } | null>(null);
  const [latestChart, setLatestChart] = useState<{
    data: ISensorData[];
  } | null>(null);
  const [latestSensor, setLatestSensor] = useState<MappedSensorData | null>(
    null,
  );

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    const handleNewDataTable = (newData: { data: ISensorData[] }) => {
      //   console.log("📡 Received WebSocket Data (Table):", newData);
      setLatestDataTable(newData);
    };

    const handleNewChart = (chartData: { data: ISensorData[] }) => {
      //   console.log("📊 Received WebSocket Data (Chart):", chartData);
      setLatestChart(chartData);
    };

    const handleNewSensorData = (sensorData: { data: ISensorData }) => {
      //   console.log("🛑 Received WebSocket Data (Sensor):", sensorData);

      const mappedData: MappedSensorData = {
        pH: {
          value: sensorData?.data?.pH,
          color: COLOR_PALETTE_SENSOR_CARD.pH(sensorData?.data?.pH),
          indicator: INDICATOR_TEXT.pH(sensorData?.data.pH),
        },
        oxygen: {
          value: sensorData?.data.oxygen,
          color: COLOR_PALETTE_SENSOR_CARD.oxygen(sensorData?.data.oxygen),
          indicator: INDICATOR_TEXT.oxygen(sensorData?.data.oxygen),
        },
        ppm: {
          value: sensorData.data.ppm,
          color: COLOR_PALETTE_SENSOR_CARD.ppm(sensorData?.data.ppm),
          indicator: INDICATOR_TEXT.ppm(sensorData.data.ppm),
        },
        pm25: {
          value: sensorData.data.pm25,
          color: COLOR_PALETTE_SENSOR_CARD.pm25(sensorData.data.pm25),
          indicator: INDICATOR_TEXT.pm25(sensorData.data.pm25),
        },
        createdAt: {
          value: formatISOTimeWithDate(
            convertToTaiwanTime(sensorData.data.createdAt as string),
          ),
        },
        temperature: {
          value: sensorData.data.temperature,
        },
        conductivity: {
          value: sensorData.data.conductivity,
        },
      };

      setLatestSensor(mappedData);
    };

    // ✅ Subscribe to WebSocket Events
    socketInstance.on("LatestDataTableData", handleNewDataTable);
    socketInstance.on("LatestChartSensorData", handleNewChart);
    socketInstance.on("latestSensorData", handleNewSensorData);

    return () => {
      // ✅ Remove listeners to avoid duplication
      socketInstance.off("LatestDataTableData", handleNewDataTable);
      socketInstance.off("LatestChartSensorData", handleNewChart);
      socketInstance.off("latestSensorData", handleNewSensorData);
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        latestDataTable,
        setLatestDataTable,
        latestChart,
        setLatestChart,
        latestSensor,
        setLatestSensor,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context)
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  return context;
};
