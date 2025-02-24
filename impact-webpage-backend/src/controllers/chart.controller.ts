import { Request, Response } from "express";
import SensorModel, { searchValidateSchema } from "../models/sensor.model";
import response from "../utils/response";
import {
  AveragedData,
  HourlyAverage,
  IChartPaginationQuery,
} from "../utils/interface";
import { convertToTaiwanTime, convertToUTCTime } from "../utils/convertUTC";

export default {
  async findAll(req: Request, res: Response) {
    const { startDate, endDate } = req.body as unknown as IChartPaginationQuery;
    try {
      const limit = 30;
      const query = {};

      if (startDate && endDate) {
        await searchValidateSchema.validate({
          startDate,
          endDate,
        });
        const startDateTime = convertToUTCTime(new Date(startDate));
        const endDateTime = convertToUTCTime(new Date(endDate));
        Object.assign(query, {
          createdAt: {
            $gte: startDateTime,
            $lt: endDateTime,
          },
        });
      }
      const result = await SensorModel.find(query)
        .limit(limit)
        .sort({ createdAt: 1 })
        .exec();

      const resultLength = result.length;

      const step = Math.ceil(resultLength / limit);

      const chartData: AveragedData[] = [];

      for (let i = 0; i < resultLength; i += step) {
        const stepData = result.slice(i, i + step);

        if (stepData.length === 0) continue; // Skip empty slices

        // Filter valid entries for each property once
        const validTemperature = stepData.filter(
          (item) => item.temperature != null
        );
        const validPH = stepData.filter((item) => item.pH != null);
        const validConductivity = stepData.filter(
          (item) => item.conductivity != null
        );
        const validOxygen = stepData.filter((item) => item.oxygen != null);
        const validPPM = stepData.filter((item) => item.ppm != null);
        const validPM25 = stepData.filter((item) => item.pm25 != null);

        const averagedData: AveragedData = {
          timestamp: stepData[0]?.createdAt || null, // Use optional chaining for safety

          temperature: validTemperature.length
            ? (
                validTemperature.reduce(
                  (sum, item) => sum + (item.temperature || 0),
                  0
                ) / validTemperature.length
              ).toFixed(2)
            : "0.00", // Default to "0.00" if no valid values

          pH: validPH.length
            ? (
                validPH.reduce((sum, item) => sum + (item.pH || 0), 0) /
                validPH.length
              ).toFixed(2)
            : "0.00",

          conductivity: validConductivity.length
            ? (
                validConductivity.reduce(
                  (sum, item) => sum + (item.conductivity || 0),
                  0
                ) / validConductivity.length
              ).toFixed(2)
            : "0.00",

          oxygen: validOxygen.length
            ? (
                validOxygen.reduce((sum, item) => sum + (item.oxygen || 0), 0) /
                validOxygen.length
              ).toFixed(2)
            : "0.00",

          ppm: validPPM.length
            ? (
                validPPM.reduce((sum, item) => sum + (item.ppm || 0), 0) /
                validPPM.length
              ).toFixed(2)
            : "0.00",

          pm25: validPM25.length
            ? (
                validPM25.reduce((sum, item) => sum + (item.pm25 || 0), 0) /
                validPM25.length
              ).toFixed(2)
            : "0.00",
          index: i,
        };

        chartData.push(averagedData);
      }

      response.success(res, chartData, "Success get chart data");
    } catch (error) {
      response.error(res, error, "Failed to get chart data");
    }
  },
  async findLatest(req: Request, res: Response) {
    try {
      const result = await SensorModel.find()
        .sort({ createdAt: -1 })
        .limit(144);
      const reversedResult = result.reverse();

      // Calculate hourly averages (6 data points per hour)
      const hourlyAverages: HourlyAverage[] = [];
      for (let i = 0; i < 24; i++) {
        const start = i * 6;
        const end = start + 6;
        const hourData = reversedResult.slice(start, end);

        // Calculate the average for this hour
        const hourAvg = hourData.reduce(
          (sum, item) => {
            return {
              temperature: sum.temperature + (item.temperature ?? 0) / 6,
              pH: sum.pH + (item.pH ?? 0) / 6,
              conductivity: sum.conductivity + (item.conductivity ?? 0) / 6,
              oxygen: sum.oxygen + (item.oxygen ?? 0) / 6,
              ppm: sum.ppm + (item.ppm ?? 0) / 6,
              pm25: sum.pm25 + (item.pm25 ?? 0) / 6,
              index: i,
            };
          },
          { temperature: 0, pH: 0, conductivity: 0, oxygen: 0, ppm: 0, pm25: 0 }
        );

        // Round the timestamp to the start of the hour
        const roundedDate = new Date(hourData[0].createdAt ?? new Date());
        roundedDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to zero

        // Format values to 2 decimal places and add to hourly averages
        hourlyAverages.push({
          createdAt: roundedDate,
          temperature: parseFloat(hourAvg.temperature.toFixed(2)),
          pH: parseFloat(hourAvg.pH.toFixed(2)),
          conductivity: parseFloat(hourAvg.conductivity.toFixed(2)),
          oxygen: parseFloat(hourAvg.oxygen.toFixed(2)),
          ppm: parseFloat(hourAvg.ppm.toFixed(2)),
          pm25: parseFloat(hourAvg.pm25.toFixed(2)),
          index: i,
        });
      }

      response.success(res, hourlyAverages, "Success get chart data");
    } catch (error) {
      response.error(res, error, "Failed to get chart data");
    }
  },
};
