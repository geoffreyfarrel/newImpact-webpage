import { SensorKey } from "@/types/Sensor";

export const SENSORS: { key: SensorKey; title: string; description: string }[] =
  [
    {
      key: "temperature",
      title: "Measured Water Temperature Value",
      description: "Measured Water Temperature Value (°C)",
    },
    {
      key: "pH",
      title: "Measured Water Acidity Value",
      description: "Measured Acidity (pH)",
    },
    {
      key: "conductivity",
      title: "Measured Water Conductivity Value",
      description: "Measured Water Conductivity (S/m)",
    },
    {
      key: "oxygen",
      title: "Measured Water Dissolved Oxygen Value",
      description: "Measured Water Dissolved Oxygen (mg/L)",
    },
    {
      key: "ppm",
      title: "Measured Water Dissolved Solid Value",
      description: "Measured Water Dissolved Solid (ppm)",
    },
    {
      key: "pm25",
      title: "Measured PM2.5 (Air Pollution) Value",
      description: "Measured PM2.5 (Air Pollution) (µg/m³)",
    },
  ];
