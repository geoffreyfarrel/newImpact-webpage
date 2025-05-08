import { Request, Response } from "express";
import response from "../utils/response";
import PredictionModel from "../models/prediction.model";
import LSTMPredictionModel from "../models/LSTM.prediction.model";
import EnsemblePredictionModel from "../models/ensemble.prediction.model";
import CNN_GRUPredictionModel from "../models/cnn_gru_prediction.model";
import CNN_LSTMPredictionModel from "../models/CNN_LSTM.prediction.model";
import TransformerPredictionModel from "../models/transformer.prediction.model";
import GRUPredictionModel from "../models/gru.prediction.model";

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
    const { modelType } = req.params;

    try {
      const allowedModels = [
        "ensemble",
        "gru",
        "lstm",
        "cnn_gru",
        "cnn_lstm",
        "transformer",
      ];
      if (!allowedModels.includes(modelType)) {
        response.error(
          res,
          "Invalid model type",
          "Failed to find 8 latest predicted data"
        );
      }

      let model;
      switch (modelType) {
        case "ensemble":
          model = EnsemblePredictionModel;
          break;
        case "gru":
          model = GRUPredictionModel;
          break;
        case "lstm":
          model = LSTMPredictionModel;
          break;
        case "cnn_gru":
          model = CNN_GRUPredictionModel;
          break;
        case "cnn_lstm":
          model = CNN_LSTMPredictionModel;
          break;
        case "transformer":
          model = TransformerPredictionModel;
          break;
        default:
          model = EnsemblePredictionModel;
          break;
      }
      const result = await model.findOne().sort({ timestamp: -1 }).exec();
      response.success(
        res,
        result,
        `Success find 8 latest ${modelType} predicted data`
      );
    } catch (error) {
      response.error(
        res,
        error,
        `Failed to find 8 latest ${modelType} predicted data`
      );
    }
  },
};
