export interface IChartPaginationQuery {
  limit: number;
  startDate?: string;
  endDate?: string;
}

export interface AveragedData {
  createdAt: Date | null | undefined;
  temperature: string;
  pH: string;
  conductivity: string;
  oxygen: string;
  ppm: string;
  pm25: string;
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

export interface IPaginationQuery extends IChartPaginationQuery {
  page: number;
}

export interface SensorData {
  temperature: number;
  pH: number;
  conductivity: number;
  oxygen: number;
  ppm: number;
  pm25: number;
  createdAt: Date;
}

export interface Stats {
  min: number;
  max: number;
  q1: number;
  median: number;
  q3: number;
}
