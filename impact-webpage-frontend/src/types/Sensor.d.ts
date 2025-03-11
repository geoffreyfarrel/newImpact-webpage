interface ISensorData {
  [key: string]: number;
  createdAt: string | Date;
  temperature: number;
  pH: number;
  conductivity: number;
  oxygen: number;
  ppm: number;
  pm25: number;
}

interface MappedSensorData {
  createdAt: { value: string; color?: string; indicator?: string };
  temperature: { value: number; color?: string; indicator?: string };
  pH: { value: number; color: string; indicator: string };
  oxygen: { value: number; color: string; indicator: string };
  conductivity: { value: number; color?: string; indicator?: string };
  ppm: { value: number; color: string; indicator: string };
  pm25: { value: number; color: string; indicator: string };
}

type SensorKey =
  | "temperature"
  | "pH"
  | "conductivity"
  | "oxygen"
  | "ppm"
  | "pm25";

export { ISensorData, MappedSensorData, SensorKey };
