interface Predictions {
  conductivity: number[];
  oxygen: number[];
  pH: number[];
  pm25: number[];
  ppm: number[];
  temperature: number[];
}

interface PredictionRow {
  key: string;
  temperature: number;
  pH: number;
  oxygen: number;
  pm25: number;
  conductivity: number;
  ppm: number;
}

interface SensorPredictionRow {
  sensor: string;
  hour1: number;
  hour2: number;
  hour3: number;
  hour4: number;
  hour5: number;
  hour6: number;
  hour7: number;
  hour8: number;
}

interface PredictionRecord {
  predictions: Predictions;
  timestamp: string;
  _id: string;
}

export { Predictions, PredictionRecord, PredictionRow, SensorPredictionRow };
