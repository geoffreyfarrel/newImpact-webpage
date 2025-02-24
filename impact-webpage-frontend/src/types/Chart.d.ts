interface ISensorData {
  createdAt: string | Date;
  temperature: number;
  pH: number;
  conductivity: number;
  oxygen: number;
  ppm: number;
  pm25: number;
}

export { ISensorData };
