import { Request, Response } from "express";
import SensorModel from "../models/sensor.model";
import response from "../utils/response";
import {
  AveragedData,
  IChartPaginationQuery,
  SensorData,
} from "../utils/interface";
import { convertToUTCTime } from "../utils/convertUTC";
import { computeStatsByMonth, groupByMonth } from "../utils/boxplotConvert";

export default {
  async findAll(req: Request, res: Response) {
    const {
      startDate,
      endDate,
      limit = 50,
    } = req.query as unknown as IChartPaginationQuery;
    const startSearchDate = convertToUTCTime(startDate as string);
    const endSearchDate = convertToUTCTime(endDate as string);

    try {
      const query: any = {};

      if (startSearchDate && endSearchDate) {
        query.createdAt = {
          $gte: startSearchDate,
          $lt: endSearchDate,
        };
      }
      const result = await SensorModel.find(query)
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
          createdAt: stepData[0]?.createdAt || null, // Use optional chaining for safety

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
        };

        chartData.push(averagedData);
      }

      response.success(res, chartData, "Success get chart data");
    } catch (error) {
      response.error(res, error, "Failed to get chart data");
    }
  },
  async findAllBoxPlot(req: Request, res: Response) {
    const sensorFields: (keyof SensorData)[] = [
      "temperature",
      "pH",
      "conductivity",
      "oxygen",
      "ppm",
      "pm25",
    ];
    try {
      const data = await SensorModel.find();

      const groupedByMonth = groupByMonth(data, sensorFields);

      const statsByMonth = computeStatsByMonth(groupedByMonth);

      response.success(res, statsByMonth, "Success get boxplot min data");
    } catch (error) {
      response.error(res, error, "Failed to get boxplot min data");
    }
  },
};
