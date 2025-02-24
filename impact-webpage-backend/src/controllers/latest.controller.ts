import { Request, Response } from "express";
import SensorModel from "../models/sensor.model";
import response from "../utils/response";

export default {
  async findLatest(req: Request, res: Response) {
    try {
      const result = await SensorModel.find().sort({ createdAt: -1 }).limit(1);
      response.success(res, result, "Success find latest data");
    } catch (error) {
      response.error(res, error, "Failed to find latest data");
    }
  },
};
