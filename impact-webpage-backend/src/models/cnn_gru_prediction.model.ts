import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CNN_GRUPredictionSchema = new Schema({
  timestamp: {
    type: Schema.Types.String,
    required: true,
  },
  predictions: {
    temperature: {
      type: [Number],
      required: true,
    },
    pH: {
      type: [Number],
      required: true,
    },
    conductivity: {
      type: [Number],
      required: true,
    },
    oxygen: {
      type: [Number],
      required: true,
    },
    ppm: {
      type: [Number],
      required: true,
    },
    pm25: {
      type: [Number],
      required: true,
    },
  },
});

const CNN_GRUPredictionModel = mongoose.model(
  "CNN_GRUPredictions",
  CNN_GRUPredictionSchema,
  "cnn_gru_prediction"
);

export default CNN_GRUPredictionModel;
