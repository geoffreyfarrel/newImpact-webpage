interface SensorStats {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

interface MonthlySensorData {
  temperature: SensorStats;
  pH: SensorStats;
  conductivity: SensorStats;
  oxygen: SensorStats;
  ppm: SensorStats;
  pm25: SensorStats;
}

type BoxPlotData = Record<string, MonthlySensorData>;
