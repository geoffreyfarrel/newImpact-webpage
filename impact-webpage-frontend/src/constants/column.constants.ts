import { SENSOR_LABEL } from "@/utils/sensorLabels";

const getColumns = (sensorType: string): { key: string; label: string }[] => [
  {
    key: "createdAt",
    label: "Measurement Time (UTC+8)",
  },
  {
    key: sensorType, // Dynamic key based on sensorType
    label: SENSOR_LABEL[sensorType] || "Sensor Value", // Get label from SENSOR_LABEL
  },
];

export default getColumns;
