export interface IChartPaginationQuery {
  limit: number;
  startDate: string;
  endDate: string;
}

export interface AveragedData {
  timestamp: Date | null | undefined;
  temperature: string;
  pH: string;
  conductivity: string;
  oxygen: string;
  ppm: string;
  pm25: string;
  index: number;
}

export interface HourlyAverage {
  createdAt: Date;
  temperature: number;
  pH: number;
  conductivity: number;
  oxygen: number;
  ppm: number;
  pm25: number;
  index: number;
}
