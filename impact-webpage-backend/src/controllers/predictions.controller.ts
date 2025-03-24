import { Request, Response } from "express";
import response from "../utils/response";
import PredictionModel from "../models/prediction.model";
import PredictionFrontendModel from "../models/prediction.frontend";
import { IPaginationQuery } from "../utils/interface";

export default {
  async findLatest(req: Request, res: Response) {
    try {
      const result = await PredictionModel.findOne()
        .sort({ timestamp: -1 })
        .exec();
      response.success(res, result, "Success find latest predicted data");
    } catch (error) {
      response.error(res, error, "Failed to find latest predicted data");
    }
  },

  async findLatestFrontend(req: Request, res: Response) {
    try {
      const result = await PredictionFrontendModel.findOne()
        .sort({ timestamp: -1 })
        .exec();
      response.success(res, result, "Success find 8 latest predicted data");
    } catch (error) {
      response.error(res, error, "Failed to find 8 latest predicted data");
    }
  },
};
