import { Request, Response } from "express";
import SensorModel from "../models/sensor.model";
import response from "../utils/response";
import { IPaginationQuery } from "../utils/interface";

export default {
  async findAll(req: Request, res: Response) {
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
    } = req.query as unknown as IPaginationQuery;
    try {
      const query: any = {};

      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      const result = await SensorModel.find(query)
        .sort({ createdAt: 1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();

      const count = await SensorModel.countDocuments(query);
      response.pagination(
        res,
        result,
        {
          current: page,
          total: count,
          totalPages: Math.ceil(count / limit),
        },
        "Success find all data table"
      );
    } catch (error) {
      response.error(res, error, "Failed to find all data table");
    }
  },
};
