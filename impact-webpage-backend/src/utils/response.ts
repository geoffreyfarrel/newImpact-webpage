import { Response } from "express";
import mongoose from "mongoose";
import * as yup from "yup";

type Pagination = {
  totalPages: number;
  current: number;
  total: number;
};

type SelectionChart = {
  total: number;
};

export default {
  success(res: Response, data: any, message: string) {
    return res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },

  error(res: Response, error: unknown, message: string) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        meta: {
          status: 400,
          message,
        },
        data: {
          [`${error.path}`]: error.errors[0],
        },
      });
    }
    if (error instanceof mongoose.Error) {
      return res.status(500).json({
        meta: {
          status: 500,
          message,
        },
        data: error.name,
      });
    }
    if ((error as any)?.code) {
      const _err = error as any;
      return res.status(500).json({
        meta: {
          status: 500,
          message: _err.errorResponse.errmsg,
        },
        data: _err,
      });
    }
    return res.status(500).json({
      meta: {
        status: 500,
        message: message || "Unknown error occurred",
      },
      data: error,
    });
  },
  pagination(
    res: Response,
    data: any[],
    pagination: Pagination,
    message: string
  ) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },
};
