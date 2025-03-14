import { convertToTaiwanTime } from "./convertUTC"; // Import time conversion functions
import { SensorData, Stats } from "./interface";

export const groupByMonth = (
  data: SensorData[],
  fields: (keyof SensorData)[]
): Record<string, Record<string, number[]>> => {
  const grouped: Record<string, Record<string, number[]>> = {};

  data.forEach((doc) => {
    if (!doc.createdAt) return; // Skip if `createdAt` is missing

    // Convert UTC to Taiwan Time (UTC+8)
    const localTime = convertToTaiwanTime(new Date(doc.createdAt));
    const yearMonth = `${localTime.getFullYear()}-${(localTime.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    // Initialize month entry if not exists
    if (!grouped[yearMonth]) {
      grouped[yearMonth] = {};
      fields.forEach((field) => (grouped[yearMonth][field as string] = []));
    }

    // Push sensor values if they exist
    fields.forEach((field) => {
      const value = doc[field];
      if (typeof value === "number") {
        grouped[yearMonth][field as string].push(value);
      }
    });
  });

  return grouped;
};
export const percentile = (arr: number[], p: number): number | null => {
  if (arr.length === 0) return null;
  const index = (p / 100) * (arr.length - 1);
  return Number.isInteger(index)
    ? arr[index]
    : (arr[Math.floor(index)] + arr[Math.ceil(index)]) / 2;
};
export const calculateStats = (values: number[]): Stats | null => {
  if (!values || values.length === 0) return null;

  values.sort((a, b) => a - b);

  return {
    min: values[0],
    max: values[values.length - 1],
    q1: percentile(values, 25) as number,
    median: percentile(values, 50) as number,
    q3: percentile(values, 75) as number,
  };
};

export const computeStatsByMonth = (
  groupedData: Record<string, Record<string, number[]>>
): Record<string, Record<string, Stats | null>> => {
  const statsByMonth: Record<string, Record<string, Stats | null>> = {};

  Object.keys(groupedData).forEach((month) => {
    statsByMonth[month] = {};
    Object.keys(groupedData[month]).forEach((sensor) => {
      statsByMonth[month][sensor] = calculateStats(groupedData[month][sensor]);
    });
  });

  return statsByMonth;
};
